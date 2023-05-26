//declar drag variable outside the function
let drag = false;
//Add attributes to any image in Dom automatic
function addDraggableAttributeToImages() {
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    image.setAttribute("draggable", "false");
    image.setAttribute("onmousedown", "");
    //   image.setAttribute('onmouseup', 'drag=false');
    //     image.id = `image${index + 1}`; // Assign unique id dynamically
    // image.style.position = 'static'; // Set initial position to static
    // image.style.left = '0';
    // image.style.top = '0';
    // image.addEventListener("mousedown", function () {
    //   // Set position to absolute when clicked
    //   image.style.position = "absolute";
    //   image.style.width = "";
    // });
    //   image.addEventListener('mouseup', function () {
    //     // Set position to static when mouseup
    //     image.style.position = 'static';
    // });
  });
}
//call addDraggableAttributeToImages when Dom loading
document.addEventListener("DOMContentLoaded", function () {
  addDraggableAttributeToImages();
});
//set function to move the image depended on the mouse moving

let moveImage = function (event) {
  const imageContainer = document.getElementById("imageContainer");
  const images = imageContainer.querySelectorAll("img");
  images.forEach((image) => {
    if (drag && image.style.position === "absolute") {
      image.style.left = event.clientX + "px";
      image.style.top = event.clientY + "px";
    }
  });
};
//The section for countdown
// Get the target event date
// let eventDate = new Date("2023-06-15T11:34:00Z");

//declar the count variable outside the function
let count;
// Variable to track the visibility state
let fieldsVisible = false;
// Get the countdown element
const countdownElement = document.getElementById("countdown");

// Function to start the countdown
function startCountdown() {
  // Get the target event date from the input field
  const eventDateInput = document.getElementById("eventDateInput").value;
  const eventDate = new Date(eventDateInput);

  // Validate the input date
  if (isNaN(eventDate.getTime())) {
    countdownElement.innerHTML = "Invalid date\uD83D\uDE21";

    return;
  }

  // Clear any existing countdown
  clearTimeout(count);
  //function to update the countdown timer
  function updateCountDown() {
    let currentDate = new Date();
    let differenceTime = eventDate - currentDate;
    //Clear the time out ane dissplay a message
    if (differenceTime <= 0) {
      clearTimeout(count);
      document.getElementById("countdown").innerHTML =
        "Congratulations, you have achieved your goal :)";
      //call celebrate function here to run when reach the goal

      celebrateGoal();
      return;
    }
    //Add if statement to stop celebrateGoal function

    //Calculate remaining days,hours,hours,minutes and seconds
    let day = Math.floor(differenceTime / (24 * 60 * 60 * 1000));
    let hours = Math.floor(
      (differenceTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    let minutes = Math.floor((differenceTime % (60 * 60 * 1000)) / (60 * 1000));
    let seconds = Math.floor((differenceTime % (60 * 1000)) / 1000);
    //Update the count down element
    document.getElementById(
      "countdown"
    ).innerHTML = `days ${day}: hours ${hours}: minutes ${minutes}: seconds ${seconds}`;
    //Update the countdown every second
    count = setTimeout(updateCountDown, 1000);
    //call the function to start the counter
  }

  updateCountDown();
}
// There was one issue in this code and I fixed it the issue was I had to declar the count outside function not inside the function.
//celebration function
function celebrateGoal() {
  // Create a canvas element
  var canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  canvas.setAttribute("id", "canvasId");
  // Get the canvas context
  var context = canvas.getContext("2d");

  // Generate random confetti particles
  var confettiParticles = [];
  for (var i = 0; i < 100; i++) {
    confettiParticles.push(createConfettiParticle(canvas.width, canvas.height));
  }

  // Animation loop
  function animateConfetti() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw confetti particles
    for (var i = 0; i < confettiParticles.length; i++) {
      var particle = confettiParticles[i];
      particle.y += particle.speed;

      // Rotate the confetti particle
      particle.rotation += particle.rotationSpeed;

      // Draw the confetti particle
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.fillStyle = particle.color;
      context.fillRect(
        -particle.size / 2,
        -particle.size / 2,
        particle.size,
        particle.size
      );
      context.restore();

      // Reset the confetti particle if it goes off-screen
      if (particle.y > canvas.height) {
        confettiParticles[i] = createConfettiParticle(
          canvas.width,
          canvas.height
        );
      }
    }

    // Repeat the animation loop
    requestAnimationFrame(animateConfetti);
  }

  // Start the animation loop
  animateConfetti();
}

// Function to create a confetti particle
function createConfettiParticle(canvasWidth, canvasHeight) {
  var colors = ["#ff4081", "#3f51b5", "#00bcd4", "#8bc34a", "#ffc107"];
  var color = colors[Math.floor(Math.random() * colors.length)];
  var size = Math.random() * 10 + 5;
  var x = Math.random() * canvasWidth;
  var y = -size;
  var speed = Math.random() * 3 + 2;
  var rotationSpeed = Math.random() * 0.1 + 0.05;
  var rotation = Math.random() * 360;
  return { color, size, x, y, speed, rotationSpeed, rotation };
}
//Function to stop the confetti animation
function removeChildElement() {
  var parentElement = document.body;
  var childElement = document.getElementById("canvasId");
  console.log(parentElement);
  // Remove the child element from its parent
  parentElement.removeChild(childElement);
}

async function fetchRandomQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random"); // Replace with the actual API URL
    const data = await response.json();

    const quotes = data.quotes; // Assuming the API response contains an array of quotes

    // put qoutes in popup div
    document.getElementById("popH");
    document.getElementById("popup");
    popup.style.visibility = "visible";
    popH.innerHTML = data.content;
  } catch (error) {
    console.error("Error:", error);
  }
}
function removePopup() {
  document.getElementById("popup");
  popup.style.visibility = "hidden";
}
//make input and button visible to set time

// Function to handle the alarm button click
function handleAlarmButtonClick() {
  if (fieldsVisible) {
    // Hide the input field and the countdown button
    settim.style.display = "none";
    // inputField.style.display = "none";
    // countdownButton.style.display = "none";
    fieldsVisible = false;
  } else {
    // Show the input field and the countdown button
    // inputField.style.display = "block";
    // countdownButton.style.display = "block";
    settim.style.display = "inline-block";
    fieldsVisible = true;
  }
}
