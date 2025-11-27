<template>
  <font-awesome-icon
    v-for="starIcon in 5"
    :icon="starIcon <= Math.round(valueToDisplay) ? filledStar : emptyStar"
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
    valueToDisplay: {
      type: Number,
    },
  },

  data() {
    return {
      filledStar: 'fa-solid fa-star',
      emptyStar: 'fa-regular fa-star',
    };
  },
};
</script>

<style scoped>
svg {
  height: 100%;
  width: 1.6em;
}

@media (min-width: 1600px) {
	svg {
		width: 1.8em;
	}
}
</style>
