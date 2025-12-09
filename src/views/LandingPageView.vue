<script>
export default {
  data() {
    return {
      showLogoEntry: true
    }
  },
  methods: 
  {
    homeButtonRoute() 
    {
      this.$router.push('/recipes');
    },
  }
}
</script>


<template>
    <!-- video sizes optimized (15 MB -> 9 MB total) -->

    <!-- ...background video... -->
  <div class="landingPageContainer">
    <video class="background-video" autoplay loop muted playsinline>
      <source src="@/Videos/Background Loop.webm" type="video/webm">
    </video>
    
    <!-- ...logo reveal... -->
    <div class="extraDarkOverlay"></div>
    <video v-show="showLogoEntry == true" class="logoIntroAndLoop" autoplay muted playsinline 
    @ended="showLogoEntry = false">
    <source src="@/Videos/Logo Entry.webm" type="video/webm">

    <!-- ...logo loop... -->
    </video>
    <video v-show="showLogoEntry == false" class="logoIntroAndLoop" autoplay loop muted playsinline>
      <source src="@/Videos/Logo Static Loop.webm" type="video/webm">
    </video>

    <button class="homeButton" @click="homeButtonRoute">Utforska Recept</button>
  </div>

</template>


<style scoped>
.landingPageContainer 
{
  position: relative;
  width: 100%;
  height: 100vh; 
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.background-video 
{
  position: absolute;
  /*inset: 0; redundant?????*/
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.extraDarkOverlay 
{
  position: absolute;
width: 100%;
height: 100%;
/*inset: 0; redundant?????*/
  background: rgba(0, 0, 0, 0.404);
}

.logoIntroAndLoop 
{
  z-index: 1;
  max-width: 80%;
  max-height: 80%;
}

.homeButton 
{
  position: absolute;
  z-index: 2;
  margin-top: 300px;
  padding: 16px 40px;
  font-size: 21px;
  font-weight: bold;
  color: white;
  background: #c41e3a;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}

.homeButton
{
  opacity: 0;
  animation: homeButtonKeyFrames 1.2s ease forwards; 
  animation-delay: 1.5s;
}


@keyframes homeButtonKeyFrames 
{
  from {
      opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.homeButton:hover {
  scale: 1.05;
  background: #a01828;
}

@media (max-width: 600px) 
{
  .logoIntroAndLoop 
  {
    max-width: 90%;
    max-height: 90%;
  }

  .homeButton 
  {
    margin-top: 250px;
    padding: 12px 30px;
    font-size: 18px;
  }
}

</style>