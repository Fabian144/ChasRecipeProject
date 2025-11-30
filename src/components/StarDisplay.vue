<template>
  <font-awesome-icon v-for="starIcon in stars" :icon="starIcon" />
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

library.add(fas, far, faStar);

export default {
  components: {
    FontAwesomeIcon,
  },

  props: {
    valueToDisplay: {
      type: Number,
    },
  },

  computed: {
    roundedValueToDisplay() {
      return Math.round(this.valueToDisplay);
    },

    stars() {
      return Array.from({ length: 5 }, (_, index) => {
        return index < this.roundedValueToDisplay ? 'fa-solid fa-star' : 'fa-regular fa-star';
      });
    },
  },
};
</script>

<style scoped>
svg {
  height: 100%;
  width: unset;
}
</style>
