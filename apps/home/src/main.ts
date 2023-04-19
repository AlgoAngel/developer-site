import { labelService } from "./label.service";
import { navigation, renderPage } from "./navigation";
import { darkMode, favoriteTools, links, linksExternals, navBar, projectsCarrousel } from "./nodes";
import { projectService } from "./project.service";

window.addEventListener("DOMContentLoaded", renderPage);
const menuClose = navBar.querySelector("input") as HTMLInputElement;

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const target: any = event.target;
    navigation(target.href);
  });
});
linksExternals.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    menuClose.checked = false;
    const target: any = event.target;
    setTimeout(() => {
      window.location.href = target.href;
    }, 600);
  });
});

async function loadProjectCarrousel() {
  try {
    const projects = await projectService.getProjects();
    const projectsCard = projects.map((project) => {
      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");
      const title = document.createElement("h2");
      title.textContent = project.title;
      const shortDescription = document.createElement("p");
      shortDescription.textContent = project.shortDescription;
      const featureImage = document.createElement("img");
      featureImage.alt = project.title;
      featureImage.src = ""
      projectCard.append(title, shortDescription, featureImage);
      if (project.published) {
        const publishedIcon = document.createElement("img");
        publishedIcon.alt = "published";
        projectCard.append(publishedIcon);
      }

      return projectCard;
    });
    projectsCarrousel.append(...projectsCard);
  } catch (error) {

    projectsCarrousel.textContent = `${error}`
  }
}

async function loadLabels() {
  const labels = await labelService.getLabels()
  const techs = labels.filter((label)=> label.type == 'tech')
  const techsToSelect = [
    'react',
    'angular',
    'tailwind',
    'nodejs',
    'typescript',
    'linux',
    'mongodb',
    'postgresql',
    'css',
    'sequelize'
  ]
  const selectedTechs = techs.filter((tech)=>{
    const textTransform = tech.title.toLowerCase().replaceAll(' ','-')
      return techsToSelect.some((item)=>item == textTransform)
    

  })
  const techContainer = document.createElement('div')
  techContainer.classList.add('favorite-tools__list')
  const techList = selectedTechs.map((tech)=>{
    const li = document.createElement('li')
    const cardTech = document.createElement('div')
    cardTech.classList.add('card--tech')
    const image = document.createElement('img')
    
    image.src = tech.image
    image.alt = tech.title
    image.width = 48
    const title = document.createElement('h3')
    title.textContent = tech.title
    li.append(cardTech)
    cardTech.append(image,title)
    return li

  })
  techContainer.append(...techList)
  favoriteTools.insertAdjacentElement('beforeend',techContainer)



}


// loadProjectCarrousel();
loadLabels()

darkMode.addEventListener('click',()=>{
  document.documentElement.classList.toggle('dark')
})