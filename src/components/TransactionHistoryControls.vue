<template>
  <div class="controls">
    <div class="filter">
      <input
        id="input-filter"
        @input="applyFilter"
        :value="this.filterValue"
        type="text"
        name="search-input"
        placeholder="Search by typing..."
      />
      <img
        id="clear-input"
        v-if="this.filterValue !== ''"
        src="./../assets/icons/cross.png"
        @click="clearInput"
        alt="clear"
      />
    </div>
    <div class="sort">
      <label>Sort by</label>
      <div class="sort-controls">
        <div class="sort-controls__option">
          <div
            class="date"
            @click="updateSort('date')"
          >
            DATE
            <img
              v-if="this.sortType === 'date'"
              :class="{ rotate: this.sortDirection === 1 }"
              src="./../assets/icons/caret-down.png"
            />
          </div>
        </div>
        <div class="sort-controls__option large">
          <div
            class="merchant"
            @click="updateSort('merchant')"
          >
            BENEFICIARY
            <img
              v-if="this.sortType === 'merchant'"
              :class="{ rotate: this.sortDirection === 1 }"
              src="./../assets/icons/caret-down.png"
            />
          </div>
        </div>
        <div class="sort-controls__option large">
          <div
            class="amount"
            @click="updateSort('amount')"
          >
            AMOUNT
            <img
              v-if="this.sortType === 'amount'"
              :class="{ rotate: this.sortDirection === 1 }"
              src="./../assets/icons/caret-down.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionHistoryControls",
  data() {
    return {
      filterValue: ""
    };
  },
  methods: {
    /*
     * simply submitting the value to the store
     * other components use the filer value7
     */
    applyFilter: function(event) {
      this.filterValue = event.target.value;
      this.$store.dispatch("setFilterValue", this.filterValue);
    },
    /*
     * resets the input
     * also submits new value to the store
     */
    clearInput: function() {
      this.filterValue = "";
      this.$store.dispatch("setFilterValue", this.filterValue);
    },
    /*
     * updates the sort state
     * if selected sort value is already the store state value
     * then just flip the sort direction
     * else change the sort type to the one clicked
     * spec states to keep to direction the same across sort types
     * so the direction is unchanged
     */
    updateSort: function(type) {
      if (this.sortType === type) {
        this.$store.dispatch("changeSortDirection");
      } else {
        this.$store.dispatch("setSortType", type);
      }
    }
  },
  computed: {
    sortType: function() {
      return this.$store.getters.sortType;
    },
    sortDirection: function() {
      return this.$store.getters.sortDirection;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./../scss/_variables";

.controls {
  display: flex;
  flex-direction: row;

  @media screen and (max-width: $bp-large) {
    flex-direction: column;
  }
}

.filter {
  display: flex;
  flex: 1;
  width: 100%;
  padding-right: 15px;

  @media screen and (max-width: $bp-smallest) {
    padding-right: 0;
  }

  & input {
    width: 100%;
    height: 25px;
    border: none;
    border-bottom: 2px solid $grey;
    font-size: $font-size-larger;
    padding: 10px 10px;

    &:focus {
      border: 1px solid $border-focus;
    }
  }
  & img {
    height: 20px;
    width: 20px;
    align-self: center;
    cursor: pointer;
  }
}

.sort {
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;

  @media screen and (max-width: $bp-largest) {
    flex: 2;
  }

  @media screen and (max-width: $bp-large) {
    flex: 1;
    padding-top: 15px;
    justify-content: space-around;
  }

  @media screen and (max-width: $bp-smallest) {
    flex-direction: column;
  }

  & label {
    min-width: 60px;
    font-size: $font-size-medium;
  }
}

.sort-controls {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  border: 1px solid $grey;

  &__option {
    display: flex;
    flex: 1;
    font-size: $font-size-small;
    font-weight: $font-weight-bold;

    height: 100%;
    border-right: 1px solid $grey;
    padding: 5px 10px;
    margin: 0 auto;

    &.large {
      min-width: 100px;

      @media screen and (max-width: $bp-smallest) {
        flex: 2;
      }
    }

    > div {
      margin: 0 auto;
      cursor: pointer;

      > img {
        width: 7px;
        vertical-align: middle;

        &.rotate {
          transform: rotate(180deg);
        }
      }
    }

    &:last-of-type {
      border: none;
    }
  }
}
</style>
