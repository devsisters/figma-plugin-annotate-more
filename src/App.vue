<template>
  <div id="app" v-focus-visible>
    <MainView />

    <transition name="slide" mode="out-in">
      <AboutView 
        class="view"
        v-if="isAboutViewOpened"
        @close-view="handleCloseAboutView" />

      <FeedbackView 
        class="view"
        v-if="isFeedbackViewOpened"
        @close-view="isFeedbackViewOpened = false" />

      <OnboardingView 
        class="view"
        v-if="isOnboardingViewOpened"
        @close-view="mutations.setIsOnboardingViewOpened(false)" />
    </transition>

    <FloatingButton 
      buttonType="secondary"
      class="floatingButton-feedback"
      @click.native="isFeedbackViewOpened = true"
      v-tooltip.top-right="`Send Feedback & Get Support`"
    />

    <FloatingButton 
      class="floatingButton-about"
      @click.native="isAboutViewOpened = true"
      v-tooltip.top-right="`Help & Credits`"
    />
  </div>
</template>

<script>
  import '@/scss/tooltip.scss'
  import '@/scss/main.scss'

  import { store, mutations } from '@/store'
  import FloatingButton from '@/components/ui/FloatingButton'
  
  // Views
  import MainView from '@/views/Main.view.vue'
  import AboutView from '@/views/About.view.vue'
  import FeedbackView from '@/views/Feedback.view.vue'
  import OnboardingView from '@/views/Onboarding.view.vue'

  export default {
    name: "App",

    components: { MainView, AboutView, FeedbackView, FloatingButton, OnboardingView },

    data: () => ({
      isAboutViewOpened: false,
      isFeedbackViewOpened: false
    }),

    computed: {
      isOnboardingViewOpened() {
        return store.isOnboardingViewOpened
      }
    },

    methods: {
      handleCloseAboutView({ openOnboarding } = {}) {
        this.isAboutViewOpened = false
        if (openOnboarding) 
          mutations.setIsOnboardingViewOpened(true)
      }
    }
  };
</script>

<style lang="scss">
  .floatingButton {
    position: absolute;
    bottom: 16px;
    z-index: 2;

    &-about {
      left: 16px;
    }

    &-feedback {
      left: 60px;
    }
  }

  .view {
    height: 100vh;
    padding: 16px;
    max-height: 100vh;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;

    user-select: text!important;
    /deep/ * {
      user-select: text!important;
    }
  }
</style>