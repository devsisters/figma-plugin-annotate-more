<template>
  <div class="aboutView scrollContainer">
    <div class="aboutView_linkContainer">
      <a @click="$emit('close-view')" href="#">&larr; Back</a>
      <a @click="$emit('close-view', { openOnboarding: true })" href="#">View intro tutorial</a>
    </div>

    <SectionTitle>Help</SectionTitle>
    <ul>
      <li>Select a frame on your figma page to add annotation to.</li>
      <li>Click <b>Create annotation</b> button to add an annotation to the selected frame.</li>
      <li>Select a color for your marker if you’d like to create annotations for different purposes.</li>
      <li>Click on the <span class="inlineIconWrap"><Icon iconName="trash" /></span> button to delete an annotation (the numbers will update auto-magically).</li>
      <li>
        You can also use some <b>Markdown</b> for formatting your annotation description:
        <ul>
          <li>
            <span class="mark">**</span><b>Bold</b><span class="mark">**</span>
            <span>or <b><kbd>CMD</kbd> + <kbd>B</kbd></b></span>
          </li>
          <li>
            <span class="mark">_</span><i>Italics</i><span class="mark">_</span>
            <span>or <b><kbd>CMD</kbd> + <kbd>I</kbd></b></span>
          </li>
          <li>
            <span class="mark">~</span><s>Strikethrough</s><span class="mark">~</span>
            <span>or <b><kbd>CMD</kbd> + <kbd>D</kbd></b></span>
          </li>
          <li>
            <u>Underline</u>
            <span>with <b><kbd>CMD</kbd> + <kbd>U</kbd></b></span>
          </li>
          <li>
            <span>Links</span>
          </li>
          <li><span class="mark">-</span> Unordered List<br></li>
          <li><span class="mark">1.</span> Ordered List</li>
          <li><span class="mark">---</span> Divider</li>
        </ul>
      </li>
      <li>Click on the <span class="inlineIconWrap"><Icon iconName="edit" /></span> button to rename your frame group (does not rename the original frame name)</li>
      <li>
        To create annotations on other frame(s):
        <ul>
          <li>Select another frame on your figma page</li>
          <li>Click the <span class="inlineIconWrap"><Icon iconName="plus" /></span> button</li>
        </ul>
      </li>
      <li>
        To delete annotations from other frame(s):
        <ul>
          <li>Select the frame group from the plugin</li>
          <li>Click the “trash” button to delete all the annotations from that frame (this action cannot be undone)</li>
        </ul>
      </li>
    </ul>

    <SectionTitle>Credits</SectionTitle>
    <p>
      <b>Developed by:</b> Fabian – <a href="https://twitter.com/madebyfabian" target="_blank">@madebyfabian on Twitter</a><br>
      <b>Designed by:</b> Sonali – <a href="https://twitter.com/sonaliagrawal" target="_blank">@sonaliagrawal on Twitter</a>
    </p>
    
    <PluginReleaseVersion />
  </div>
</template>

<script>
  import SectionTitle from '@/components/ui/SectionTitle'
  import Icon from '@/components/ui/Icon'
  import PluginReleaseVersion from '@/components/PluginReleaseVersion'

  export default {
    components: { SectionTitle, Icon, PluginReleaseVersion },
  }
</script>

<style lang="scss" scoped>
  .aboutView {
    overflow-y: scroll;

    &_linkContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    kbd {
      background: $color--background-silver;
      border-radius: 3px;
      padding: 0 4px;
      font-size: 10px;
      font-weight: 600;
    }

    .sectionTitle {
      margin: 16px 0 0;
      padding-left: 0;
    }

    ul {
      margin: 0;
      padding-left: 1rem;

      li {
         margin: 4px 0;
      }

      li ul {
        list-style-type: none;
        padding-left: 0;

        span {
          opacity: .66;

          &.mark {
            color: $color--blue;
            opacity: 1;
          }
        }
      }
    }
  }
</style>