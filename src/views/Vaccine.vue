<template>
    <div class="vaccine">
        <vs-row vs-align="center" vs-justify="center" vs-type="flex">
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8"  style="padding:0 8px" vs-sm="12">
            <h2 class="levo py-2">Vaccine</h2>
            <p class="levo">Researchers worldwide are working around the clock to find a vaccine against SARS-CoV-2, the virus causing the COVID-19 pandemic. Experts estimate that a fast-tracked vaccine development process could speed a successful candidate to market in approximately 12-18 months – if the process goes smoothly from conception to market availability.</p>
            <p class="levo">To date, just one coronavirus vaccine has been approved. Sputnik V – formerly known as Gam-COVID-Vac and developed by the Gamaleya Research Institute in Moscow – was approved by the Ministry of Health of the Russian Federation on 11 August. Experts have raised considerable concern about the vaccine’s safety and efficacy given it has not yet entered Phase 3 clinical trials.</p>
            <p class="levo">This tracker lists COVID-19 vaccine candidates currently in Phase 1-3 trials, as well as major candidates in pre-clinical stages of development and research. To reveal in-depth information about each candidate, click on the Show/Hide button next to each entry.</p>
                <vs-card>
                    <b-table :items="items" :fields="fields"
                    hover
                    :bordered="true"
                    :striped='true'
                    responsive
                    >
                    <template v-slot:cell(index)="data">
                        {{ data.index + 1 }}
                    </template>
                    <template v-slot:cell(show_details)="row">
                        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                        {{ row.detailsShowing ? 'Hide' : 'Show'}}
                        </b-button>
                    </template>
                    <template v-slot:cell(sponsors)="row">
                        {{ row.value | arrToString}}
                    </template>
                    <template v-slot:cell(institutions)="row">
                        {{ row.value | arrToString}}
                    </template>
                    <template v-slot:cell(funding)="row">
                        {{ row.value | arrToString}}
                    </template>

                    <template v-slot:row-details="row">
                        <b-card>
                            <h5 class="levo">Study Design &#38; Details</h5>
                            <p class="levo">{{ row.item.details }}</p>
                        </b-card>
                    </template>
                    </b-table>
                </vs-card>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      show: false,
      fields: [
        {
          key: 'index',
          label: '#',
          tdClass: 'levo'
        },
        {
          key: 'candidate',
          label: 'Candidate',
          sortable: true,
          tdClass: 'levo'
        },
        {
          key: 'sponsors',
          label: 'Sponsors',
          sortable: true,
          tdClass: 'levo'
        },
        {
          key: 'trialPhase',
          label: 'Trial Phase',
          sortable: true,
          tdClass: 'levo'
        },
        {
          key: 'institutions',
          label: 'Institutions',
          sortable: true,
          tdClass: 'levo'
        },
        {
          key: 'funding',
          label: 'Funding',
          sortable: true,
          tdClass: 'levo'
        },
        {
          key: 'show_details',
          label: 'Details',
          tdClass: 'levo'
        }
      ],
      items: []
    }
  },
  created: function () {
    axios.get('https://disease.sh/v3/covid-19/vaccine').then(resp => {
      this.items = resp.data.data
    })
  },
  filters: {
    arrToString: function (obj) {
      return JSON.stringify(obj).replace('[', '').replace(']', '').replace(/"/g, '').replace(/&rsquo/g, '`').replace(/,/g, ', ').replace(/&nbsp/g, ' ')
    }
  }
}
</script>

<style scoped>
.sakrij{
    display: none;
}
</style>
