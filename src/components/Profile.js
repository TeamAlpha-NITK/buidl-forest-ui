export default {
    name: "Profile",
    data: () => {
        return {
            trees: null
        }
    },
    template: `
    <div class="market">
        <h2 style="width: 100%; text-align: center">Profile</h2>
        <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-large-size-40 md-small-size-70 md-xsmall-size-100 tree-item" v-for="(tree, index) in trees" v-bind:key="index">
                <md-card class="tree-card">
                    <md-card-header>
                        <md-card-media>
                            <img class="tree-svg" src="../assets/tree.svg" alt="Tree" v-bind:style="{fill: tree.color}">
                        </md-card-media>
                        <md-card-header-text class="tree-text">
                            <div class="md-title">Value: {{ tree.value }}</div>
                            <div class="md-title">Age: {{ tree.age }}</div>
                        </md-card-header-text>
                        <div style="display: flex; align-items: center">
                            <md-button class="md-primary" style="color: #ed7d3a; font-weight: bold">Sell</md-button>
                        </div>
                    </md-card-header>

                    <!-- <md-card-actions>
                        <md-button class="md-raised md-primary" style="background-color: #ed7d3a;">Buy</md-button>
                    </md-card-actions> -->
                </md-card>
            </div>
        </div>
        <div style="height: 10vh"></div>
    </div>
    `,
    mounted() {
        this.loadTrees();
    },
    methods: {
        loadTrees() {
            let trees = [
                {
                    age: 9,
                    color: "#f1544e",
                    latitude: 129216,
                    longitude: 776946,
                    value: 2.7,
                },
                {
                    age: 11,
                    color: "#334ef8",
                    latitude: 128316,
                    longitude: 775646,
                    value: 0.7,
                },
                {
                    age: 10,
                    color: "#2de448",
                    latitude: 129416,
                    longitude: 775946,
                    value: 1.2,
                },
                {
                    age: 14,
                    color: "#33ee48",
                    latitude: 128716,
                    longitude: 774946,
                    value: 0.5,
                },
            ]
            this.trees = trees;
        },
        async loadMyTrees() {
            const {balanceOf, tokenOfOwnerByIndex, spaceships} = TreeToken.methods;
            const list = [];

            const total = await balanceOf(web3.eth.defaultAccount).call();
            if (total) {
                for (let i=total - i; i>=0; i--) {
                    const id = await tokenOfOwnerByIndex(web3.eth.defaultAccount, i).call();
                    const info = await spaceships(i).call();

                    const tree = {
                        id,
                        ...info
                    };
                    list.push(tree);
                }
            }

            this.trees = list;
        },
        sellShip(id) {
            const { forSale } = TreeMarket.methods;
            const sellPrice = 0;
            const toSend = forSale(id, web3.utils.toWei(sellPrice));
            toSend.send({gas: 3000000})
            .then(receipt => {
                console.log(receipt);
            })
            .catch(err => console.log(err));
        }
    }
}
