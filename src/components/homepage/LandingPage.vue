<script>
export default {
  data() {
    return {
      showLogoEntry: true
    }
  },
  methods: {
    homeButtonRoute() {
      this.$router.push('/recipes');
    },
    /*onLogoEntryEnded() {
      this.showLogoEntry = false;
    }*/
  }
}
</script>

<template>
    
  <div class="landingPageContainer">
    <video class="background-video" autoplay loop muted playsinline>
      <source src="@/Videos/Background Loop.webm" type="video/webm">
    </video>
    
    <div class="extraDarkOverlay"></div>
    
    <!-- 
    (defunct halvkeff iteration med död frame/hack efter intro videon spelat klart)
    
    <video v-if="showLogoEntry == true" class="loopingLogo" autoplay muted playsinline 
    
    @ended="onLogoEntryEnded"> onLogoEntryEnded(); 
    --->

    <!-- 
    <source src="@/Videos/Logo Entry.webm" type="video/webm"> 
    </video>
    
    <video v-else preload="auto" class="loopingLogo" autoplay loop muted playsinline>
      <source src="@/Videos/Logo Static Loop.webm" type="video/webm">
    </video> 
    -->

    <video v-show="showLogoEntry == true" class="logoIntroAndLoop" autoplay muted playsinline 
    
    @ended="showLogoEntry = false">

      <source src="@/Videos/Logo Entry.webm" type="video/webm">
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
  margin-top: 380px;
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

</style>