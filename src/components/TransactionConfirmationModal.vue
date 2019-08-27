<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="confirmation-form__wrapper">
          <div class="confirmation-form__header">
            <img src="./../assets/icons/transparent-arrows.png" />
            <h2>Confirm Transaction</h2>
          </div>
          <div class="confirmation-form">
            <div>
              <label>FROM ACCOUNT</label>
              <label class="details">{{ this.pendingTransaction.from }}</label>
            </div>
            <div>
              <label>TO ACCOUNT</label>
              <label class="details">{{ this.pendingTransaction.to }}</label>
            </div>
            <div>
              <label>AMOUNT</label>
              <label class="details">${{ this.pendingTransaction.amount }}</label>
            </div>
            <button
              class="button cancel"
              @click="cancelTransaction()"
            >
              CANCEL
            </button>
            <button
              class="button confirm"
              @click="confirmTransaction()"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "TransactionConfirmationModal",
  methods: {
    cancelTransaction() {
      this.$store.dispatch("cancelPendingTransaction");
    },
    confirmTransaction() {
      this.$store.dispatch("commitPendingTransaction");
    }
  },
  computed: {
    pendingTransaction: function() {
      return this.$store.getters.pendingTransaction;
    }
  }
};
</script>

<style lang="scss">
@import "./../scss/_variables";

.modal {
  &-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $modal-mask;
    display: table;
    transition: opacity 0.3s ease;
  }

  &-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  // transition
  &-enter {
    opacity: 0;
  }

  &-leave-active {
    opacity: 0;
  }

  &-enter {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  &-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  &-leave-active {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  &-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}

.confirmation-form {
  padding-top: 15px;

  &__wrapper {
    width: 25%;
    height: 100%;
    background-color: $white;
    box-shadow: -2px -2px 10px $box-shadow;
    min-width: 300px;
    max-height: 490px;
    margin: 0 auto;

    @media screen and (max-width: $bp-medium) {
      overflow: scroll;
    }
  }

  &__header {
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

  & > div {
    padding: 5px 25px;
  }

  & label {
    display: block;
    padding: 5px 0;
    font-weight: $font-weight-thick;

    &.details {
      text-align: center;
      font-size: $font-size-largest;
      font-weight: $font-weight-regular;
      max-width: calc(100vw / 5);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 170px;
      margin: 0 auto;
    }
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
      color: $grey;
    }
  }
}

.button {
  width: 62%;
  height: 50px;
  display: block;
  right: 0;
  margin: 0 auto;
  border-radius: 5px;
  font-size: $font-size-large;
  font-weight: $font-weight-thick;
  text-align: center;
  color: $white;
  cursor: pointer;
  border: none;

  &.confirm {
    background-color: $orange;
    margin-bottom: 35px;
  }
  &.cancel {
    margin-top: 40px;
    background-color: $red;
    margin-bottom: 20px;
  }
}
</style>
