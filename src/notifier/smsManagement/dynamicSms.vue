<template>
  <div>
    <Breadcrumbs main="Messaging" title="Dynamic SMS"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="edit-profile">
        <div class="row">

          <div class="col-xl-8">
            <b-card header-tag="div" no-body>
              <h5 slot="header"> Send Dynamic SMS </h5>
              <b-card-body>
                    <form>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="form-label">Select Sender ID</label>
                            <b-form-select v-model="numberSelectedFlatInput" class="btn-square"
                                           :options="numberOptions"></b-form-select>

                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="form-label">Select File (CSV) | Download Sample File</label>
                            <div>
                              <b-form-file class="form-control" plain></b-form-file>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-4">
                          <button class="btn btn-primary" type="submit">Send SMS</button>
                        </div>
                      </div>
                    </form>
              </b-card-body>
              <h5 slot="header"></h5>
            </b-card>

          </div>
          <div class="col-xl-4">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title mb-0"> Information</h4>
              </div>
              <div class="card-body">

                <span class="font-primary">Dynamic File:</span>  Dynamic SMS is a kind of text messaging service majorly used for marketing purposes. It involves the use of keywords, preferences, and information to create customized messages for the recipients.
                <br>
                <br>
                <span class="font-primary">Download Sample CSV</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberSelectedFlatInput: 1,
      numberOptions: [
        {value: 1, text: 1},
        {value: 2, text: 2},
        {value: 3, text: 3},
        {value: 4, text: 4},
        {value: 5, text: 5}
      ],
      smsCount: ""
    }
  },
  methods: {
    getCharacterCount() {
      return this.smsCount.length
    }
  }
};
</script>
