const images = [
  "./images/img1.jpg",
  "./images/img2.jpg",
  "./images/img3.jpg",
  "./images/shoe1.jpg",
  "./images/shoe2.jpg",
  "./images/shoe3.jpg",
];
const bottomImages = [
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1633113216317-d0bb16e34e3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1638482856830-16b0e15fcf2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1638467048668-16ea0f49de7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1638489440786-0ab170d0ae9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1638497424199-e455a6265fe9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
];
const links = ["link1", "link2", "link3", "link4", "link5", "link6"];
const descriptions = [
  `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries`,
  `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words`,
  `consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero`,
  `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
  `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using`,
  `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
];
const headlinesTop = [
  "Sneaker",
  "Jackets",
  "Mans Shoe",
  "Begies",
  "Hoodies",
  "Lather",
];
const headlinesBottom = [
  "For All time",
  "For you only",
  "Limited edit",
  "Just arrived",
  "Get set go",
  "Let's go!",
];
const grayBox = [
  `<p>01-05</P><p>This is an html</P><p>There are many variations of passages of Lorem Ipsum available</P>`,
  `<p>02-05</P><p>This is an html</P><p>There are many variations of passages of Lorem Ipsum available</P>`,
  `<p>03-05</P><p>This is an html</P><p>There are many variations of passages of Lorem Ipsum available</P>`,
  `<p>04-05</P><p>This is an html</P><p>There are many variations of passages of Lorem Ipsum available</P>`,
  `<p>05-05</P><p>This is an html</P><p>There are many variations of passages of Lorem Ipsum available</P>`,
  `<p>06-05</P><p>This is an html</P><p>There are many variations of passages of Lorem Ipsum available</P>`,
];

const leftImage = document.querySelector(".image");
const bottomImage = document.querySelector(".bottomImage");
const gray_box = document.querySelector(".g_b_i");
const description = document.querySelector(".description");
const topHeadline = document.querySelector(".topHeadline");
const bottomHeadline = document.querySelector(".bottomHeadline");
const shopNow = document.querySelector(".shopNow");

let current = 0;
let goNext = true;
const maxSlide = images.length - 1;

const setItems = (index) => {
  if (goNext) {
    goNext = false;
    leftImage.style.width = `0%`;
    bottomImage.style.width = `0%`;
    gray_box.style.opacity = `0`;
    description.style.opacity = `0`;
    topHeadline.style.opacity = `0`;
    bottomHeadline.style.opacity = `0`;
    setTimeout(() => {
      leftImage.innerHTML = `<img src="${images[index]}" />`;
      bottomImage.innerHTML = `<img src="${bottomImages[index]}" />`;
      shopNow.href = links[index];
      topHeadline.innerHTML = headlinesTop[index];
      bottomHeadline.innerHTML = headlinesBottom[index];
      description.innerHTML = descriptions[index];
      gray_box.innerHTML = grayBox[index];
      bottomImage.children[0].addEventListener("load", () => {
        bottomImage.style.width = `300px`;
        leftImage.style.width = `40%`;
        gray_box.style.opacity = `1`;
        description.style.opacity = `1`;
        topHeadline.style.opacity = `1`;
        bottomHeadline.style.opacity = `1`;
        goNext = true;
      });
    }, 300);
  }
};
setItems(current);

document.querySelector(".next").addEventListener("click", () => {
  if (current === maxSlide) {
    current = 0;
  } else {
    current++;
  }
  setItems(current);
});

document.querySelector(".prev").addEventListener("click", () => {
  if (current === 0) {
    current = maxSlide;
  } else {
    current--;
  }
  setItems(current);
});
