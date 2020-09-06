<template>
  <div class="about">
     <vs-row vs-align="center" vs-justify="center" vs-type="flex">
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8"  style="padding:0 8px" vs-sm="12">
            <vs-card>
              <div class="pl-4">
              <h2>Infographics about coronavirus COVID-19 disease</h2>
              <h5>Coronavirus numbers put into perspective</h5>
              </div>
            <img src="img/coronavirus-by-number-infographic.jpg" alt="Coronavirus by number infographic">
            </vs-card>
            </vs-col>
        </vs-row>
        <vs-row vs-align="center" vs-justify="center" vs-type="flex">
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8"  style="padding:0 8px" vs-sm="12">
            <vs-card>
              <div class="pl-4">
              <h2>FAQs</h2>
              <h5>Everything you need to know about the coronavirus</h5>
              </div>
             <vs-collapse :type="'margin'">
      <vs-collapse-item>
       <div slot="header">
         <h6>What is coronavirus?</h6>
       </div>
       <p>The “corona” in the name of the virus means a simple crown. This is because the virus has a barbed edge around it. Coronavirus, like most representatives of a huge family of viruses, often infects animals. In this case, bats and birds, which first quickly infected their colonies and reached people.Last December, a new type of coronavirus was confirmed in Wuhan, the Hubei province, China. The new virus was similar to the SARS (the deadly coronavirus that killed nearly two hundred people in 2003). Like other coronaviruses, 2019-nCoV was first noticed in animals and the first infected people got it by eating infected meat.The World Health Organization declared a global health emergency last week in order to protect countries with poorly-developed health systems that may not be able to manage the infection spread properly.</p>
      </vs-collapse-item>
      <vs-collapse-item>
       <div slot="header">
         <h6>How can I protect myself?</h6>
       </div>

       <p>Cook meat properly.Don’t touch your mouth, nose, eyes with your hands and wash your hands more often.Some people can spread infection not having any symptoms themselves, so it is better to always follow these simple rules.Another popular way of protection is face masks. If you have any symptoms of any respiratory infection, you should wear a mask to protect other people from getting infected (masks do not to let droplets from coughing or sneezing appear on different surfaces). At the same time, there is no evidence that wearing masks could help healthy people not to get ill.</p>
     </vs-collapse-item>
     <vs-collapse-item>
       <div slot="header">
         <h6>When and how will the outbreak end?</h6>
       </div>

       <p>There is no answer to this question.As time goes by, more and more patients will recover and more and more affected people will be isolated and will not be able to spread the virus. After that, the virus may simply “die out” because NOT everyone can get infected (some of us have genes that make us unsusceptible). “Disease outbreaks are a bit like fires,” the VOX expert writes. “The virus is the flame. Susceptible people are fuel. Eventually, a fire burns itself out if it runs out of kindling. A virus outbreak will end when it stops finding susceptible people to infect.”Additionally, international coordinated actions may help stop the disease. Limiting the infection to small isolated areas, creating the vaccine (the genome of the virus is already known and scientists are using it to “find a cure”) and new protocols of treatments will make the virus “die out” faster.If the virus does not “die out”, that will not necessarily lead to something terrible. Not at all. The virus may become a part of our “usual virus set” — become another common virus. That happened to the H1N1 flu virus that had frightened the whole world in 2009 but now is just one of many every-year flu viruses.Anyway, the second “Spanish flu” epidemic is not among the most possible scenarios. (Please, remember that at the beginning of the 20th century there were no developed quarantine measures and diagnostic tools. Treatment of chronic diseases was also not as developed as it is now).</p>
     </vs-collapse-item>
     <vs-collapse-item>
       <div slot="header">
          <h6>How fast is it spreading?</h6>
       </div>

       <p>Hundreds of new cases are being reported worldwide each day. However, it is thought health agencies may be unaware of many cases.After starting in China, coronavirus is now spreading fast in countries like South Korea, Italy, and Iran.</p>
     </vs-collapse-item>
          <vs-collapse-item>
       <div slot="header">
          <h6>What are the coronavirus symptoms?</h6>
       </div>

       <p>Coronavirus infects the lungs. The symptoms start with a fever followed by a dry cough. After a week, it can lead to shortness of breath and some people need hospital treatment.The early symptoms can easily be confused with other winter bugs including colds and flu.The incubation period – between infection and showing symptoms – lasts up to 14 days, the World Health Organization (WHO) says. Some researchers say it may be up to 24 days.People will be most infectious when they have symptoms, but there have been suggestions some can spread the virus even before they are sick.</p>
     </vs-collapse-item>
          <vs-collapse-item>
       <div slot="header">
          <h6>Do I need to use a mask?</h6>
       </div>
        <p>
       • If you are healthy, you only need to wear a mask if you are taking care of a person with suspected 2019-nCoV infection.</p>
       <p>• Wear a mask if you are coughing or sneezing.</p>
       <p>• Masks are effective only when used in combination with frequent hand-cleaning with alcohol-based hand rub or soap and water.</p>
       <p>• If you wear a mask, then you must know how to use it and dispose of it properly.</p>
     </vs-collapse-item>
          <vs-collapse-item>
       <div slot="header">
          <h6>What is known about the cause of the Coronavirus outbreak?</h6>
       </div>

       <p>The novel coronavirus is thought to come from bats. It is not yet known whether other animal species serve as intermediate hosts of the bat-human virus. It is currently assumed that the first sufferers were infected in a market in Wuhan in the province of Hubei, China, in early December 2019. The novel coronavirus received the official name “SARS-CoV-2”, the respiratory disease that triggers it is known as “COVID-19”.</p>
     </vs-collapse-item>
    </vs-collapse>
            </vs-card>
            </vs-col>
        </vs-row>
  </div>
</template>

<style scoped>
h2,h5 {
  font-weight: bold;
  text-align: left;
}
img {
  padding:30px 40px;
  width:100%;
}
.vs-collapse{
  text-align: left;
}
</style>
