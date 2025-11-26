<template>
  <font-awesome-icon
    v-for="starIcon in starIcons"
    :icon="starIcon.value <= Math.round(ratingValue) ? filledStar : emptyStar"
  />
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
    ratingValue: {
      type: Number,
    },
  },

  data() {
    return {
      starIcons: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
      filledStar: 'fa-solid fa-star',
      emptyStar: 'fa-regular fa-star',
    };
  },
};
</script>

<style scoped>
svg {
  height: 100%;
  width: 2em;
}
</style>
