p1 = "";
p2 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});
camera = document.getElementById("webcam");
Webcam.attach(camera);

function takepic() {
    Webcam.snap(function (pic) {
        document.getElementById("result").innerHTML = '<img id="snap_pic" src="' + pic + '"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modelloaded);

function modelloaded() {
    console.log("Model Loaded Succesfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "the first prediction is " + p1;
    speak_data2 = "and the second prediction is " + p2;
    var utter = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utter);
}

function predict() {
    image = document.getElementById("snap_pic");
    classifier.classify(image, getResult);

}

function getResult(E, R) {
    if (E) {
        console.error(E);
    } else {
        console.log(R);
        p1 = R[0].label;
        p2 = R[1].label;
        document.getElementById("emotion_name_1").innerHTML = p1;
        document.getElementById("emotion_name_2").innerHTML = p2;
        if (p1 == "happy") {
            document.getElementById("emoji_icon_1").innerHTML = "&#128522";
        }
        if (p1 == "sad") {
            document.getElementById("emoji_icon_1").innerHTML="&#128532";
        }
        if(p1=="angry"){
            document.getElementById("emoji_icon_1").innerHTML="&#128548";
        }

        if (p2 == "happy") {
            document.getElementById("emoji_icon_2").innerHTML = "&#128522";
        }
        if (p2 == "sad") {
            document.getElementById("emoji_icon_2").innerHTML="&#128532";
        }
        if(p2=="angry"){
            document.getElementById("emoji_icon_2").innerHTML="&#128548";
        }
        speak();
    }
}