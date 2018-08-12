// import slider from 'vue-color/src/components/Slider.vue';
// import { validationMixin } from 'vuelidate';
// import {
//   required,
//   minValue,
// } from 'vuelidate/lib/validators'
// import {Slider} from 'https://cdn.jsdelivr.net/npm/vue-color@2.4.6/dist/vue-color.js';

let defaultColor = {
  hex: '#194d33',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 1
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 1
  },
  a: 1
}
export default {
  name: 'Map',
  // components: {
  //   'slider-picker': Picker.Slider,
  // },
  template: `
  <div>
    <md-dialog :md-active.sync="showDialog" :md-fullscreen="false">
      <md-dialog-title>Plant a new tree!</md-dialog-title>
      <form style="padding: 16px" novalidate>
        <md-field :class="getValidationClass('age')">
          <label for="age">Age</label>
          <md-input type="number" name="age" id="age" autocomplete="number" v-model="form.age" :disabled="sending" />
          <span class="md-error" v-if="!form.age.required">Age is required</span>
        </md-field>
        <div>
          <div style="padding-bottom: 8px; color: #777; font-size: larger">Color</div>
          <!-- <slider-picker v-model="form.color" style="max-width: 75vw"/> -->
          <input type="color" v-model="form.color">
        </div>
        <md-field :class="getValidationClass('value')">
          <label for="value">Value (in ether)</label>
          <md-input type="number" name="value" id="value" autocomplete="number" v-model="form.value" :disabled="sending" />
          <span class="md-error" v-if="!form.value.required">Value is required</span>
          <span class="md-error" v-if="!form.value.minValue">Minimum 0.1 ethers</span>
          <span class="md-helper-text" v-if="form.value.minValue">Minimum 0.1 ethers</span>
        </md-field>
      </form>
      <md-dialog-actions>
        <md-button @click="showDialog = false">Cancel</md-button>
        <md-button class="md-primary" @click="createTree()">Create</md-button>
      </md-dialog-actions>
    </md-dialog>
    <div class="map-container">
      <div id="map" class="map"></div>
      <!-- <md-button class="md-dense md-raised md-primary tree-button">Plant A Tree!</md-button> -->
      <div class="my-location md-elevation-6" @click="reCenterMap()"><md-icon>my_location</md-icon></div>
      <div class="tree-button md-elevation-6" @click="showDialog = true"><md-icon>local_florist</md-icon></div>
    </div>
    <!-- <div
      class="form-check"
      v-for="layer in layers"
      :key="layer.id" >
      <label class="form-check-label">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="layer.active"
          @change="layerChanged(layer.id, layer.active)"
        />
        {{ layer.name }}
      </label>
    </div> -->
  </div>
  `,
  // mixins: [validationMixin],
  data: function() {
    return {
      showDialog: false,
      form: {
        age: 0,
        color: defaultColor,
        value: 0,
      },
      sending: false,
      map: null,
      tileLayer: null,
      layers: [
        {
          id: 0,
          name: 'User',
          features: [
            {
              id: 0,
              name: 'User Location',
              type: 'marker',
              coords: [12.9716, 77.5946],
            },
          ],
        },
        {
          id: 1,
          name: 'Plants',
          features: [],
        }
      ],
      currentPosition: null,
    }
  },
  validations: {
    form: {
      age: {
        // required,
      },
      value: {
        // required,
        // minValue: minValue(0.1)
      }
    }
  },
  mounted() {
    let plants = [
      {
        age: 10,
        color: "#2de448",
        latitude: 129416,
        longitude: 775946,
        value: 1.2,
      },
      {
        age: 9,
        color: "#f1544e",
        latitude: 129216,
        longitude: 776946,
        value: 2.7,
      },
      {
        age: 14,
        color: "#33ee48",
        latitude: 128716,
        longitude: 774946,
        value: 0.5,
      }
    ]
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = position.coords;
        this.layers[0].features[0].coords = [this.currentPosition.latitude, this.currentPosition.longitude];
        let i = 0;
        plants.forEach(plant => {
          this.layers[1].features.push({
            id: i,
            age: plant.age,
            color: plant.color,
            value: plant.value,
            coords: [plant.latitude*0.0001, plant.longitude*0.0001],
          })
          i++;
        })
        this.initMap();
        this.initLayers();
        console.log(position);
      });
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
  },

  methods: {
    initMap() {
      this.map = L.map('map').setView([this.currentPosition.latitude, this.currentPosition.longitude], 12);
      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      );

      this.tileLayer.addTo(this.map);
    },
    initLayers() {
      this.layers.forEach((layer) => {
        // const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
        var treeIcon = L.icon({
          iconUrl: 'data:image/jpeg;base64,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',
          iconSize: [40, 60],
          iconAnchor: [20, 59],
          popupAnchor: [-3, -76],
          // shadowUrl: '/src/assets/logo.png',
          // shadowSize: [68, 95],
          // shadowAnchor: [22, 94]
        });
        let options = {};
        if (layer.name === "Plants") {
          options = {icon: treeIcon};
        }
        layer.features.forEach((feature) => {
          feature.leafletObject = L.marker(feature.coords, options)
            .bindPopup(JSON.stringify(feature.coords));
          feature.leafletObject.addTo(this.map);
        });
      });
    },
    reCenterMap() {
      this.map.setView([this.currentPosition.latitude, this.currentPosition.longitude], this.map.getZoom());
    },
    getValidationClass (fieldName) {
      const field = this.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      // this.$v.$reset()
      this.form.age = null
      this.form.color = defaultColor
      this.form.value = null
    },
    createTree() {
      // this.$v.$touch()
      if (!this.form.$invalid) {
        console.log(this.form.color);
        let treeDetails = {
          age: parseInt(this.form.age),
          color: web3.utils.fromAscii(this.form.color.hex),
          value: web3.utils.toWei(this.form.value),
          latitude: parseInt(this.currentPosition.latitude*10000),
          longitude: parseInt(this.currentPosition.longitude*10000)
        }
        const { mint, buyTree } = TreeToken.methods;
        let toSend = mint(treeDetails.age, treeDetails.color, treeDetails.latitude, treeDetails.longitude, treeDetails.value);

        toSend.send({gas: 3000000})
        .then(receipt => {
            console.log(receipt);
            let id = receipt.id;
            const trx = buyTree(id);
            trx.send({gas: 3000000})
            .then(receipt1 => {
                console.log(receipt1);
            })
            .catch(err => console.log(err));
        })
        .catch(err=> {
            console.log(err);
        })
        .finally(() => {
            this.showDialog = false;
        });
      }
    },
    async loadAllTrees() {

    }
  }
}


