/*
@article{Xie2015SCUTFBPAB,
  title={SCUT-FBP: A Benchmark Dataset for Facial Beauty Perception},
  author={Duorui Xie and Lingyu Liang and Lianwen Jin and Jie Xu and Mengru Li},
  journal={2015 IEEE International Conference on Systems, Man, and Cybernetics},
  year={2015},
  pages={1821-1826}
}
*/

const imgNamer = i => `./dataset/1/${i}.jpg`;
const promises = [];
const totalImages = 20;
const trainingImages = 15;
var labels = ["apple", "banana"];

function setup() {
    // don't even know what this does, but not using P5
    noCanvas();
    useFeatures();
}

function getImgSrc (classNo, order){
    return './dataset/'+classNo +'/' + order + '.jpg';
}

async function useFeatures() {
    const featureExtractor = await ml5.featureExtractor('MobileNet');
    // https://ml5js.org/docs/custom-regression
    const classifier = await featureExtractor.regression();
    // const classifier = await featureExtractor.classification();

    for (var k=0; k<=0; k++){
    // there are 500 images in the set. We will train on some. Very slow.
        for (var i = 1; i < trainingImages; i++) {
            var label = labels[k];

            //using vanilla js
            promises[i] = new Promise(resolve => {
                var img = new Image();
                img.src = getImgSrc(k+1, i);
                // the secret is that addImage is async
                classifier.addImage(img, label, () => {
                    resolve();
                    img = null;
                });
            }); // end promises
        }
    }

    // when all images have been added to the regressor, train and predict
    Promise.all(promises)
        .then(() => {
            console.log('Training.');
            classifier.train(lossValue => {
                if (lossValue) {
                    // training
                    console.log(lossValue);
                } else {
                    // done
                    var img = new Image();
                    const makeNum = () => Math.round(Math.random() * (totalImages - trainingImages )) + trainingImages;
                    img.src = imgNamer(makeNum());
                    const el = document.querySelector('#pic');
                    el.src = img.src;
                    classifier.predict(img, (err, result) => {
                        if (err) return console.warn(err);
                        // this should be labels
                        console.log('rating: ' + result.value);
                    });
                }
            });
        });
}