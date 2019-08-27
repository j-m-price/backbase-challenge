<template>
  <div class="transaction-item">
    <div
      class="transaction-item__category--color"
      :style="{ 'background-color': this.transaction.categoryCode }"
    ></div>
    <div class="transaction-item__container">
      <div class="transaction-item__date">
        <p>{{ this.date }}</p>
      </div>
      <img :src="this.transaction.merchantLogo" />
      <div class="transaction-item__details">
        <p class="transaction-item__details--merchant">{{ this.transaction.merchant }}</p>
        <p class="transaction-item__details--type">{{ this.transaction.transactionType }}</p>
      </div>
      <p class="transaction-item__amount">-${{ this.transaction.amount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionItem",
  props: ["transaction"],
  computed: {
    /*
    * formats the data label
    * could have used something like moment.js
    * but I didn't see the need to use a package for this
    * seems quite specific so I've kept it in the component
    * but it could easily be moved to a mixin and re-used
    */
    date: function() {
      const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
      ];
      let timeStamp = new Date(this.transaction.transactionDate);
      return `
      ${months[timeStamp.getMonth()]}. 
      ${timeStamp.getDate()}
    `;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./../scss/_variables";

.transaction-item {
  display: flex;
  max-height: 85px;

  & img {
    filter: grayscale(100%);
    height: 50px;
    align-self: center;
    padding-right: 35px;

    @media screen and (max-width: $bp-smallest) {
      padding-right: 15px;
    }
  }

  & p {
    margin: 0;
  }

  &__container {
    width: 100%;
    display: flex;
    position: relative;
    border-top: 2px solid $grey;
  }

  &__category--color {
    width: 10px;
    min-height: 80px;
  }

  &__date {
    width: 10%;
    position: relative;
    padding-left: 10px;
    padding-right: 50px;

    @media screen and (max-width: $bp-smallest) {
      padding-right: 20px;
    }

    & > p {
      position: absolute;
      color: grey;
      font-size: $font-size-small;
      width: 60px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__amount {
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
    font-size: $font-size-larger;
  }

  &__details {
    &--merchant {
      padding-top: 15px;
      font-weight: $font-weight-thick;
      max-width: calc(100vw / 5);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 5px;

      @media screen and (max-width: $bp-medium) {
        max-width: calc(100vw / 3);
      }

      @media screen and (max-width: $bp-small) {
        max-width: calc(100vw / 4);
      }
    }
    &--type {
      font-weight: $font-weight-bold;
      font-size: $font-size-medium;
      line-height: 1.2;
      max-width: calc(100vw / 5);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 5px;

      @media screen and (max-width: $bp-medium) {
        max-width: calc(100vw / 3);
      }

      @media screen and (max-width: $bp-small) {
        max-width: calc(100vw / 4);
      }
    }
  }
}
</style>
