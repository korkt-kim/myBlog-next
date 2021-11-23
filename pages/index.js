import Section from '../src/components/Section.js'

export default function Home() {
  return (
    <div>
      <Section
        title="JavaScript"
        description="polz's javascript diary"
        backgroundImage="javascript-background.jpeg"
        btnText="Link to Category"
      ></Section>
      <Section
        title="VueJs/NuxtJs"
        description="polz's vuejs/nuxtjs diary"
        backgroundImage="vuejs-background.jpeg"
        btnText="Link to Category"
      ></Section>
      <Section
        title="React"
        description="polz's react diary"
        backgroundImage="react-background.jpeg"
        btnText="Link to Category"
      ></Section>
    </div>
  )
}
