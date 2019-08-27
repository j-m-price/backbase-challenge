<template>
  <div class="transaction-form">
    <div class="transaction-form__header">
      <img src="./../assets/icons/transparent-arrows.png" />
      <h2>Make a Transfer</h2>
    </div>
    <div class="form">
      <div>
        <label>FROM ACCOUNT</label>
        <input
          :value="fromAccountWithValue"
          name="fromAccount"
          type="text"
          disabled
        />
      </div>
      <div>
        <label>TO ACCOUNT</label>
        <input
          v-model="toAccount"
          name="toAccount"
          type="text"
        />
      </div>
      <div>
        <label>AMOUNT</label>
        <div class="transaction-form__amount-container">
          <span>$</span>
          <input
            v-model="transactionAmount"
            name="transactionAmount"
            type="number"
          />
        </div>
      </div>
      <p
        v-if="this.errorMessage"
        class="error"
      >{{ this.errorMessage }}</p>
      <button
        class="submit-button"
        type="submit"
        @click="submitTransaction()"
      >SUBMIT</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionForm",
  data() {
    return {
      fromAccount: "",
      toAccount: "",
      transactionAmount: 0,
      errorMessage: null
    };
  },
  mounted() {
    this.setFromAccount();
    this.resetForm();
  },
  methods: {
    /*
     * if the form is inValid, just returns
     * validate() will handle any errors
     * if valid, creates an object and submits to the store
     * once submitted, clears the form
     */
    submitTransaction() {
      if (!this.validate()) {
        return;
      }

      const amount = this.transactionAmount ? this.transactionAmount : 0;
      const newTransaction = {
        from: this.fromAccount,
        to: this.toAccount,
        amount: this.roundToTwoDecimals(amount)
      };

      this.$store.dispatch("setPendingTransaction", newTransaction);
      this.resetForm();
    },
    /*
     * makes sure that the format of the number
     * is never more than 2 decimal places
     */
    roundToTwoDecimals(value) {
      return Math.floor(value * 100) / 100;
    },
    /*
     * setting initial value
     * hard coded as per requirements
     */
    setFromAccount() {
      this.fromAccount = "Free Checking(4692)";
    },
    resetForm() {
      this.toAccount = "";
      this.transactionAmount = 0;
    },
    /*
     * checks for an invalid requirement
     * if found, sets the error message to the specific failure
     * and sets valid to false
     * returns valid
     */
    validate() {
      let valid = true;
      this.errorMessage = null;

      try {
        if (!this.accountValid) {
          throw Error("Account required");
        } else if (!this.transactionAmountValid) {
          throw Error("Amount must be greater than 0");
        } else if (
          this.$store.getters.accountValue - this.transactionAmount <
          -500
        ) {
          throw Error("Account cannot go below -$500.00");
        }
      } catch (error) {
        this.errorMessage = error.message;
        valid = false;
      }

      return valid;
    }
  },
  computed: {
    accountValue: function() {
      return this.$store.getters.accountValue;
    },
    fromAccountWithValue: function() {
      return `${this.fromAccount} - $${this.roundToTwoDecimals(
        this.accountValue
      )}`;
    },
    // simple check to make sure the value isn't blank ir whitespace
    accountValid: function() {
      return this.toAccount.trim() !== "";
    },
    // checks to make sure value is positive and above 1 cent.
    transactionAmountValid: function() {
      return this.transactionAmount >= 0.01;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./../scss/_variables";

.transaction-form {
  width: 25%;
  height: 100%;
  background-color: $white;
  box-shadow: -2px -2px 10px $box-shadow;
  min-width: 300px;
  margin-right: 3%;

  @media screen and (max-width: $bp-medium) {
    width: 100%;
  }
}

.form {
  padding-top: 15px;

  & > div {
    padding: 20px 25px;
  }

  & label {
    display: block;
    padding: 5px 0;
    font-weight: $font-weight-thick;
  }

  & input {
    width: 100%;
    height: 25px;
    border: none;
    border-bottom: 2px solid $grey;
    font-size: $font-size-large;

    &:focus {
      border: 1px solid $grey;
    }

    &:disabled {
      background-color: $white;
      color: grey;
    }
  }
}

.submit-button {
  width: 62%;
  height: 50px;
  display: block;
  right: 0;
  margin: 0 auto;
  margin-right: 25px;
  margin-top: 30px;
  border-radius: 5px;
  background-color: $orange;
  font-size: $font-size-large;
  font-weight: $font-weight-thick;
  text-align: center;
  color: $white;
  margin-bottom: 35px;
  cursor: pointer;
  border: none;
}

.transaction-form__header {
  display: flex;
  padding: 11px 10px;
  background-color: $blue;

  & img {
    width: 25px;
    height: 25px;
    align-self: center;
  }

  & h2 {
    margin: 0 auto;
    color: $white;
    font-weight: $font-weight-thin;
    font-size: $font-size-larger;
    align-self: center;
  }
}

.transaction-form__amount-container {
  display: flex;

  & span {
    align-self: center;
    padding-right: 3px;
  }
}

.error {
  text-align: center;
  color: $red;
  border: 1px solid $red;
  border-radius: 10px;
  width: 75%;
  margin: 0 auto;
}
</style>
