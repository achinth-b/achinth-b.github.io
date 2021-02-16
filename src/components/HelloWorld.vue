<template>
  <div class="hello">
    <br />
    <br />

    <div class="bigbox">
      <div>
        <v-carousel cycle interval="4000"
        :show-arrows="false" class="me">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>

        <div class="midboxgithub">
          <a href="https://github.com/achinth-b">
            <img
              src="../assets/github-icon.png"
              style="height: 60%; position: relative;
                            top: 19%;
                            left: 0%"
            />
          </a>
        </div>

        <div class="midboxresume">
         <a href="Achinth_Bharadwaj_Resume_B.pdf">
            <img
              src="../assets/resume-icon.png"
              style="height: 60%; position: relative;
                            top: 20%;
                            left: 0%"
            />
          </a>
        </div>

        <div class="midboxmedium">
          <a href="https://abharadwaj.medium.com">
            <img
              src="../assets/medium-icon.png"
              style="height: 60%; position: relative;
                            top: 20%;
                            left: 0%"
            />
          </a>
        </div>
        <div class="midboxlinkedin">
          <a href="https://linkedin.com/in/achinthb">
            <img
              src="../assets/linkedin-icon.png"
              style="height: 55%; position: relative;
                            top: 20%;
                            left: 0%"
            />
          </a>
        </div>
        <div class="midboxcall">
          <a href="tel:+17783198140">
            <img
              src="../assets/phone-icon.png"
              style="height: 60%; position: relative;
                            top: 20%;
                            left: 0%"
            />
          </a>
        </div>
        <div class="midboxemail">
          <a href="mailto:achinth@student.ubc.ca?subject=Hey Achinth!">
            <img
              src="../assets/email-icon.png"
              style="height: 55%; position: relative;
                            top: 23%;
                            left: 0%"
            />
          </a>
        </div>

        <div class="whatido">
           
            <div style="position: relative; width: 50%; padding: 23px; display: inline-block;"> 
              • i'm just a normal guy. 
               <br/>
              • i've lived in vancouver for too long now.
               <br/>
              • i speak kannada, a language with more speakers than there are canadians. 
               <br/>
              • i've only lived in rainforests.
            </div>

            <div style="position: relative; width: 50%; padding: 23px; display: inline-block;"> 
              What am I engaged in?  
               <br/>
              • web dev
              <br/>
              • frontend dev
              
               <br/>
              • ML & data science
               <br/>
              • design & interaction
              <br/>
              • cooking
              <br/>
              • politics
            </div>


        </div>

        <div class="whatilove">
          <br />
          I've done my best, including:
          <v-timeline dark>
            <v-timeline-item
              v-for="(item, i) in done"
              :key="i"
              small
              style="transform: scale(0.75); padding:-24px"
            >
              <template v-slot:opposite>
                <span style="font-size:25px">{{ item.year }}</span>
              </template>

              <v-card>
                <v-card-text style="color: #f0ffe0; transform: scale(1.4)">
                  {{ item.did }}
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </div>

        <div class="typer">
          <vue-typer
            :text="[
              'software engineer.',
              'machine learning gunner.',
              'ultimate frisbee player.',
              'food explorer.',
              'pacific northwest bred.',
              'hiker of many mountains.',
            ]"
            :repeat="Infinity"
            :shuffle="true"
            initial-action="erasing"
            :pre-type-delay="70"
            :type-delay="100"
            :pre-erase-delay="1500"
            :erase-delay="50"
            erase-style="backspace"
            :erase-on-complete="false"
            caret-animation="blink"
          ></vue-typer>
        </div>
      </div>
    </div>

    <div class="footer">
      <footer>
        made with 💖, achinth © 2021.
      </footer>
    </div>
  </div>
</template>

<script>
import me from "../assets/me.jpg";
import sunset from "../assets/sunset.jpeg";
import mom from "../assets/mom.jpg"
import { VueTyper } from "vue-typer";

export default {
  
  data() {
    return {
      me: me,
      sunset: sunset,
      mom: mom,
      items: [
          {
            src: me,
          },
          {
            src: sunset,
          },
          {
            src: mom,
          },
      ],

      done: [
        {
          color: "red lighten-2",
          icon: "mdi-star",
          year: 2019,
          did: "UBC Launch Pad 🚀",
        },
        {
          color: "red lighten-2",
          icon: "mdi-star",
          year: 2020,
          did: "intern @boeing 🛩️",
        },
        {
          color: "red lighten-2",
          icon: "mdi-star",
          year: 2021,
          did: "UBC Pandas 🐼",
        },
        {
          color: "red lighten-2",
          icon: "mdi-star",
          year: "2021 and beyond",
          did: "who knows? 🔎",
        },
      ],
    };
  },
  name: "HelloWorld",
  components: {
    VueTyper,
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bigbox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 950px;
  height: 600px;
  border-radius: 74px;
  background: #d1dec3;
  box-shadow: 35px 35px 70px #b2bda6, -35px -35px 70px #f0ffe0;
}

.midboxgithub {
  position: relative;
  left: 350px;
  top: -480px;
  width: 95px;
  height: 95px;
  border-radius: 37px;
  text-align: center;
  background: #e0e0e0;
  box-shadow: 13px 13px 26px #b2bda6, -13px -13px 26px #f0ffe0;
}

.midboxresume {
  position: relative;
  left: 465px;
  top: -575px;
  width: 95px;
  height: 95px;
  text-align: center;
  border-radius: 37px;
  background: #e0e0e0;
  box-shadow: 13px 13px 26px #b2bda6, -13px -13px 26px #f0ffe0;
}

.midboxlinkedin {
  position: relative;
  left: 350px;
  top: -663px;
  width: 95px;
  height: 95px;
  text-align: center;
  border-radius: 37px;
  background: #e0e0e0;
  box-shadow: 13px 13px 26px #b2bda6, -13px -13px 26px #f0ffe0;
}

.midboxemail {
  position: relative;
  left: 465px;
  top: -853px;
  width: 95px;
  height: 95px;
  text-align: center;
  border-radius: 37px;
  background: #e0e0e0;
  box-shadow: 13px 13px 26px #b2bda6, -13px -13px 26px #f0ffe0;
}

.midboxcall {
  position: relative;
  left: 465px;
  top: -655px;
  width: 95px;
  height: 95px;
  text-align: center;
  border-radius: 37px;
  background: #e0e0e0;
  box-shadow: 13px 13px 26px #b2bda6, -13px -13px 26px #f0ffe0;
}

.midboxmedium {
  position: relative;
  left: 350px;
  top: -465px;
  width: 95px;
  height: 95px;
  text-align: center;
  border-radius: 37px;
  background: #e0e0e0;
  box-shadow: 13px 13px 26px #b2bda6, -13px -13px 26px #f0ffe0;
}

.whatido {
  position: relative;
  text-align: center;
  width: 550px;
  height: 200px;
  left: 23px;
  top: -719px;
  border-radius: 35px;
  background: #e0e0e0;
  box-shadow: 13px 13px 26px #b2bda6, -13px -13px 26px #f0ffe0;
}

.whatilove {
  position: relative;
  width: 320px;
  text-align: center;
  height: 531px;
  left: 603px;
  top: -1250px;
  border-radius: 35px;
  background: #e0e0e0;
  box-shadow: 13px 13px 26px #b2bda6, -13px -13px 26px #f0ffe0;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  margin-bottom: 17.5px;
  text-align: center;
}

.me {
  position: relative;
  transform: scale(0.6);
  width: 52.6325%;
  left: -75px;
  top: -80px;
  border-radius: 45px;
  background: #d1dec3;
  box-shadow: 35px 35px 70px #b2bda6, 
              -35px -35px 70px #f0ffe0;
}

.typer {
  position: relative;
  width: 100%;
  height: 100%;
  top: -1238px;
  text-align: center;
  font-size: 20px;
}
</style>
