<template>
	<div>
		<tiny-slider v-bind="sliderOptions" @indexChanged="handleIndexChanged">
			<div class="slide-item">
				<img 
					src="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_confetti.svg" 
					aria-hidden="true" 
					class="slide-item__confetti isLeft"
				/>

				<img 
					src="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_confetti.svg" 
					aria-hidden="true" 
					class="slide-item__confetti isRight"
				/>

				<img 
					src="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_slide_1.jpg"
					srcset="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_slide_1@2x.jpg 2x"
					class="slide-item__image"
					loading="lazy"
				/>
				<h2 class="slide-item__title">V2.0 is here 🎉</h2>
				<p class="slide-item__description">Now you can select individual frames to add annotations<br>to each frame automagically.</p>
			</div>

			<div class="slide-item">
				<img 
					src="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_slide_2.jpg"
					srcset="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_slide_2@2x.jpg 2x"
					class="slide-item__image"
					loading="lazy"
				/>
				<h2 class="slide-item__title">1. Select frame</h2>
				<p class="slide-item__description">
					Select the frame you want to start creating annotations on<br>and click on the
					<b><span class="inlineIconWrap"><Icon iconName="plus" /></span> Create annotation</b> button.
				</p>
			</div>

			<div class="slide-item">
				<img 
					src="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_slide_3.jpg"
					srcset="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_slide_3@2x.jpg 2x"
					class="slide-item__image"
					loading="lazy"
				/>
				<h2 class="slide-item__title">2. Select another frame</h2>
				<p class="slide-item__description">
					To start annotations on another frame in your file, simply click 
					the <span class="inlineIconWrap"><Icon iconName="plus" /></span> button and a new Frame group will get created with the frames name. Each frame group number will begin with 1.
				</p>
			</div>

			<div class="slide-item">
				<img 
					src="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_slide_4.jpg"
					srcset="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_slide_4@2x.jpg 2x"
					class="slide-item__image"
					loading="lazy"
				/>
				<h2 class="slide-item__title">3. Add annotations</h2>
				<p class="slide-item__description">
					Make sure you have the correct frame selected to<br>add annotations to and click the 
					<b><span class="inlineIconWrap"><Icon iconName="plus" /></span> Add new</b>
					button.
				</p>
			</div>

			<div class="slide-item">
				<img 
					src="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_slide_5.jpg"
					srcset="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_slide_5@2x.jpg 2x"
					class="slide-item__image"
					loading="lazy"
				/>
				<h2 class="slide-item__title">4. Rename frame</h2>
				<p class="slide-item__description">
					Click on the <span class="inlineIconWrap"><Icon iconName="edit" /></span> icon to rename the frame group name.
				</p>
				<p class="slide-item__sub-description">NOTE: renaming a frame in the plugin does not rename the original frame in the file.</p>
			</div>

			<div class="slide-item">
				<img 
					src="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_slide_6.jpg"
					srcset="https://raw.githubusercontent.com/madebyfabian/figma-plugin-annotate-it/master/static/onboarding_slide_6@2x.jpg 2x"
					class="slide-item__image"
					loading="lazy"
				/>
				<h2 class="slide-item__title">5. Delete frame</h2>
				<p class="slide-item__description">
					Click on the 
					<span class="inlineIconWrap"><Icon iconName="trash" /></span> 
					icon to delete an entire frame group.
				</p>
				<p class="slide-item__sub-description">NOTE: this action will delete all the annotations from that frame and 
					there will not be a way to get them back unless adding them manually again.</p>
			</div>
		</tiny-slider>
		
		<transition name="slide" mode="out-in">
      <Button v-if="!displayContinueBtn" buttonType="tertiary" class="skip-btn" @click="handleCloseView">Skip</Button>
    </transition>

		<transition name="slide" mode="out-in">
			<Button v-if="displayContinueBtn" buttonType="primary" class="continue-btn" @click="handleCloseView">Get Started</Button>
    </transition>
	</div>
</template>

<script>
	import TinySlider from 'vue-tiny-slider'
	import Button from '@/components/ui/Button.vue'
  import Icon from '@/components/ui/Icon'
	import { mutations } from '@/store'

	export default {
		components: { TinySlider, Button, Icon },

		data: () => ({
			sliderOptions: {
				mode: 'gallery',
				loop: false,
				controlsPosition: 'bottom',
				navPosition: 'bottom',
				controlsText: [ '←', '→' ],
			},
			displayContinueBtn: false
		}),

		methods: {
			handleIndexChanged( e ) {
				this.displayContinueBtn = (e.displayIndex === e.pages)
			},

			handleCloseView() {
				mutations.setIsOnboardingViewOpened(false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'tiny-slider/src/tiny-slider';

	$space: 1.625rem;

	.continue-btn,
	.skip-btn {
		position: absolute;
		bottom: $space;
	}

	.skip-btn {
		left: $space;
	}

	.continue-btn {
		right: $space;
	}

	::v-deep {
		.tns-visually-hidden {
			position: absolute;
			width: 1px;
			height: 1px;
			margin: -1px;
			padding: 0;
			border: 0;
			clip: rect(0 0 0 0);
			overflow: hidden;
		}

		.tns-nav,
		.tns-controls {
			position: absolute;
			bottom: 2rem;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.tns-nav {
			z-index: 1;

			button {
				height: 0.75rem;
				width: 0.75rem;
				background: $color--background-silver;
				border-radius: 100%;
				margin: 0.25rem;
				border: none;
				cursor: pointer;
				transition: background-color 150ms ease, transform 150ms ease;
				transform: scale(0.75);

				&.tns-nav-active {
					background: $color--blue;
					transform: scale(1);
				}
			}
		}

		.tns-controls	{
			z-index: 0;

			button {
				margin: 0 4.5rem 3px; // gap
				background: transparent;
				border: none;
				padding: 0;
				color: $color--black-8;
				opacity: .75;
				font-size: 1rem;
				transition: opacity 150ms ease;

				&:not(:disabled) {
					cursor: pointer;
				}

				&:disabled {
					opacity: 0.15;
				}
			}
		}

		.slide-item {
			&__image {
				display: block;
				margin: 0.5rem auto 1rem;
				pointer-events: none;
				height: 230px;
			}

			&__title, &__description, &__sub-description {
				text-align: center;
				margin: 0 2rem;
			}

			&__title {
				font-size: 18px;
				line-height: 24px;
				letter-spacing: -0.006em;
				font-weight: 600;
				margin-bottom: 1rem;
			}

			&__description {
				@include font(14);

				* {
					@include font(14);
				}

				b {
					@include font(14, 'bold');
				}
			}

			&__sub-description {
				@include font();
				margin-top: 0.5rem;
				color: $color--black-8;
			}

			&__confetti {
				position: absolute;
				top: -1.5rem;
				z-index: 1;
				pointer-events: none;
				
				&.isLeft {
					left: -1.5rem;
				}

				&.isRight {
					right: -1.5rem;
				}
			}
		}
	}
</style>