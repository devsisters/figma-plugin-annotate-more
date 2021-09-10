<template>
  <div class="feedbackView">
    <a @click="$emit('close-view')" href="#">&larr; Back</a>

    <div v-if="!isFeedbackSent">
      <SectionTitle>Send us your Feedback!</SectionTitle>
      <p>If you have any ideas for features, issues or perhaps ways to improve the plugin, we would love to hear from you.</p>
      <br>
      <input type="text" placeholder="Your Name (optional)" v-model="feedbackData.name">
      <br>
      <input type="email" placeholder="Your Email (optional)" v-model="feedbackData.email">
      <br>
      <textarea placeholder="Your Message" v-model="feedbackData.message" />
      <p class="error-line" v-if="isError">Error sending your Feedback. Please try again!</p>
      <p class="error-line" v-if="isNotFilled">Please at least fill in a Feedback-Message! 🥰</p>
      
      <br><br>
      <Button buttonType="primary" @click.native="sendFeedback">Send Feedback</Button>
    </div>

    <div v-else>
      <SectionTitle>Thank you for your Feedback! 🎉</SectionTitle>
      <p>This helps us to continue making this plugin even better.</p>
    </div>

    <br><br>
    <p>
      Feel free to shoot us an email at <a href="mailto:annotate-it@uxtionary.com" target="_blank">annotate-it@uxtionary.com</a>
    </p>

    <PluginReleaseVersion />
  </div>
</template>

<script>
  import { store } from '@/store'

  import SectionTitle from '@/components/ui/SectionTitle'
  import Button from '@/components/ui/Button'
  import PluginReleaseVersion from '@/components/PluginReleaseVersion'

  export default {
    components: { SectionTitle, Button, PluginReleaseVersion },

    data: () => ({
      feedbackData: {
        name: '',
        email: '',
        message: ''
      },
      isFeedbackSent: false,
      isError: false,
      isNotFilled: false
    }),

    methods: {
      async sendFeedback() {
        if (this.feedbackData.message.length === 0) {
          this.isNotFilled = true
          return
        }
        this.isNotFilled = false
        this.isError = false

        try {
          const res = await fetch(store.functionsBaseUrl +  '/annotate-it-send-feedback', {
            method: 'POST',
            body: JSON.stringify({
              ...this.feedbackData
            })
          })

          const data = res.json()
          if (data.error)
            throw new Error('Something gone wrong with the API Call.')

          this.isFeedbackSent = true
        } catch (error) {
          this.isError = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .feedbackView {
    .sectionTitle {
      margin: 16px 0 0;
      padding-left: 0;
      width: 100%;
    }

    input, textarea {
      width: 260px;
      border-radius: 3px;
      border: 1px solid $color--special-black-1;

      &::placeholder {
        color: $color--black-3;
      }
    }

    input {
      margin-bottom: 8px;
      padding: 0 8px;
      height: 32px;
    }

    textarea {
      height: 80px;
      padding: 8px;
      resize: none;
    }

    .error-line {
      color: $color--red;
      margin-top: 8px;
    }
  }
</style>