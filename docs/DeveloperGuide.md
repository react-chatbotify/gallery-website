<p align="center">
  <img width="200px" src="https://raw.githubusercontent.com/tjtanjin/react-chatbotify/main/assets/logo.png" />
  <h1 align="center">React ChatBotify Gallery Website</h1>
</p>

## Table of Contents

- [Introduction](#introduction)
- [Navigating this Developer Guide](#navigating-this-developer-guide)
- [Design](#design)
- [Implementation](#implementation)
- [Code Documentation](#code-documentation)
- [Testing](#testing)
- [Final Notes](#final-notes)

<div  style="page-break-after: always;"></div>

## Introduction

Welcome to the Developer Guide for the React Chatbotify Gallery Website project. Before diving into this guide, ensure you have gone through the project [_README_](https://github.com/your-repo/react-chatbotify-gallery-website/blob/main/README.md) for an overview. This guide assumes you have a **basic understanding** of [**React**](https://reactjs.org/), [**TypeScript**](https://www.typescriptlang.org/) and [**TailwindCSS**](https://tailwindcss.com/). In addition, you should also be familiar with [**React ChatBotify**](https://react-chatbotify.com), which is the core library that this project complements.

## Navigating this Developer Guide

To facilitate your reading, take note of the following syntaxes used throughout this guide:

| Syntax    | Description                                                                          |
| --------- | ------------------------------------------------------------------------------------ |
| `Code`    | Denotes functions, components, or code-related references (e.g., `App`, `useEffect`) |
| _Italics_ | Refers to folder or file names (e.g., _App.js_, _components_)                        |
| **Bold**  | Highlights important keywords or concepts                                            |

<div  style="page-break-after: always;"></div>

## Setup

Setting up the project is relatively simple. Before you begin, ensure that you have **at least NodeJS 16.x** installed (this project was first developed on v20.3.1).

1. Fork the [project repository](https://github.com/tjtanjin/react-chatbotify-gallery-website).
2. Clone the **forked project** into your desired directory with:
   ```
   git clone {the-forked-project}.git
   ```
3. Next, `cd` into the project and install dependencies with:
   ```
   npm install
   ```
4. Once installations are complete, you may launch the project with:
   ```
   npm run start
   ```

**Note:** For internal developers, you will be provided with a `.env` file. It contains the variables for you to interact with the development environment APIs and make OAuth logins via the GitHub test application. For public contributors, you will have to setup your own backend API server and create your own GitHub application if necessary. However, for the majority of cases, this will **not be necessary**.

## Design

### Overview

The project is neatly structured within the _src_ folder, which contains subfolders with their own responsibilities:

- assets
- components
- constants
- context
- hooks
- interfaces
- pages
- routes
- services
- styles

We will not be covering what each folder does - the folders are self-explanatory in what they do, and this guide assumes its users to have the knowledge to explore the folder structure. However, do note that as of the last update to this guide, the project is still relatively new and this structure may be changed & refined down the road.

### Gallery Pages

The gallery website serves up several pages to its users, some of which are only visible if a user is logged in. The following pages are available for public use (i.e. user need not be logged in):

- Home/Landing
- Themes
- Plugins
- Theme Builder
- Author Profile

The following pages are only available when a user is logged in:

- Personal Profile
- Theme Upload
- Plugin Upload

Note that the rating of themes/plugins are also only possible if a user is logged in. Below, we look at the purpose of each page to give you, the developer, a better idea of its purpose.

#### Home Page

The home (landing) page is typically what the user first sees upon visiting the website. It's kept simple, with minimal distractions and just a few important elements (e.g. login, documentation) for the user to interact with. The idea behind keeping things simple and providing only a few options is to guide users directly to what is important.

#### Themes Page

The themes page serves up a collection of themes for users to browse, rate and favorite. Themes are loaded in batches of 30 as the user scrolls (infinite scrolling) and are each presented neatly in a theme card. Users can interact with the theme card to take actions such as favoriting the theme or opening up a modal to download the theme files.

On top of that, there's also a preview button that will load the theme directly into the interactive live chatbot on the right column of the page. It's also worth noting that themes can stack and their order matters! This can be a potentially fun page with enough themes for users to explore and mix around. Finally, a small search bar sits at the top right corner of the page to allow users to filter themes. It supports basic searches (handled backend) that does a partial matching of the search term with theme name and description. Tags are not yet fully supported but is an area that can be improved.

#### Plugins Page

This page is under construction, but is intended to be similar to the themes page. Supporting live preview for plugins might be a challenge, but this is an idea worth exploring further. Not much effort has gone into this yet, especially since plugins are also not yet supported on the core libary. Nonetheless, having ideas are still great!

#### Theme Builder

Browsing themes is great, but imagine being able to create them directly on the website and better still, share them with others! Likely the most ambitious part of the project, the theme builder is aimed at supporting users to create their own themes directly on the page and then uploading them if they wish. Like the plugins page, this is still under construction.

#### Author Profile

The author profile page will allow users to view basic information about a theme or plugin author. These information are pulled from GitHub when an author logs in (authors would have already logged in via GitHub, otherwise they wouldn't be able to be identified as an author). In addition, it will show all the author's creations as well, along with their ratings received.

#### Personal Profile

This is a simple personal profile page for users to view information about themselves and manage their own themes or plugins (if applicable).

#### Theme Upload

This page is not confirmed, it might be possible to integrate this into the themes page or theme builder page (although to upload, the user must be logged in).

#### Plugin Upload

This page is not confirmed, it might be possible to integrate this into the plugins page (although to upload, the user must be logged in).

## Implementation

The project is still in early stages and there aren't significant implementations to note. Theme builder will definitely become an important implementation to document when the time comes, but work has not commenced for it. Perhaps, it would be interesting to cover OAuth integration but this also requires some of the backend documentation to be completed. This section will be revisited in due time.

## Project Management

### GitHub Projects & Issues

The progress of the project is tracked using [**GitHub Projects**](https://github.com/users/tjtanjin/projects/6) and [**issues**](https://github.com/tjtanjin/react-chatbotify-gallery-website/issues). Internally, the project team conducts bi-weekly sprints, with each sprint focused on epic issue(s) that serves as the overall goal for that period. Team members will be assigned smaller bite-size issues to tackle, which will contribute towards resolving the epic issues by the end of the sprint.

If you are looking to contribute to the project as a public contributor, then you may ignore the information above about the sprints. You are strongly encouraged to take up **good-first-issues** if it is your first time working on the project. Do also note that issues prefixed with **[Task]** are internal issues meant for team members only.

### Forking Workflow

This project adopts the [**Forking Workflow**](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow). In short, here are the steps required:

1. Fork the repository
2. Clone the forked repository to your local device
3. Make your code changes
4. Push to your forked remote repository
5. Open a pull request from your forked repository to the upstream repository (i.e. the main repository)

In addition, developers should fill up the pull requests template diligently. This ensures that changes are well-documented and reviewed before merging.

### Commit Messages

This project adopts [**Conventional Commits**](https://www.conventionalcommits.org/en/v1.0.0/), with a minor difference that **the first word after the commit type is always capitalised**. For example, notice how "A" in "Add" is capitalised in this commit message: `feat: Add initial theme builder layout`.

## Code Documentation

Adhering to code documentation best practices is crucial for maintainability. Each file should start with a brief description of its purpose. Functions and components should include comments where necessary, especially for complex logic. A typical comment structure is as follows:

```javascript
/**
 * Fetches gallery themes from the backend.
 * @param  {number}  page - The page number to fetch
 * @param  {number}  limit - The number of themes per page
 * @returns {Promise<Array>} An array of gallery themes
 */
async function fetchGalleryItems(page, limit) {
  // Implementation...
}
```

The above shows an example code comment for a function that fetches gallery themes from the backend server.

Finally, any leftover tasks or areas in the code to be revisited should be flagged with a comment like the one below:

```
// todo: tj to optimize the calculation code here
```

That way, we can identify what are the tasks to finish up here and optionally, state who will be responsible for it.

## Testing

To be updated

## Final Notes

The designs in this project are not perfect. We encourage experienced developers to help seek out areas for **improvements** in the application! We value your input and welcome contributions to enhance the chatbot. Happy coding!
