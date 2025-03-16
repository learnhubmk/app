# LearnHub.mk - Empowering Web Developers

LearnHub.mk is an innovative online learning platform dedicated to nurturing the skills of web developers, both junior and senior.

Our mission is to provide a collaborative space where individuals can enhance their web development expertise, work on real projects, and engage with a supportive community. Whether you are embarking on your coding journey or a seasoned developer, LearnHub.mk has something valuable to offer.


## Features

### 📚 Comprehensive Learning Resources

Access a diverse range of educational materials covering various web development topics. 

Stay updated with the latest trends and best practices in the ever-evolving tech landscape.

### 💬 Community Forums

Participate in dynamic discussions, share insights, and seek support from a vibrant community of learners and seasoned professionals. 

Exchange ideas, troubleshoot challenges, and build lasting connections.

### 🤝 Collaborative Projects

Immerse yourself in real-world scenarios by joining or initiating projects within the community.

Collaborate with fellow developers, apply your skills, and contribute to meaningful projects that mirror industry standards.

### 👥 Mentorship Opportunities

Connect with industry experts and mentors who can provide guidance, support, and valuable feedback on your projects or career path. 

Leverage the wisdom of experienced professionals to accelerate your learning journey.

## Technology Stack

- Next.js: Chosen for its powerful server-side rendering capabilities, enhancing SEO and performance.
- React Query: Efficient data fetching, caching, and state management in React.
- SASS: Write maintainable CSS with support for variables, nesting, and mixins.
- React Bootstrap: Rapidly build a responsive UI with a suite of reusable components.
- ESLint: Ensures code quality and consistency across the project.

## Setup and Installation

Before diving into LearnHub.mk, make sure you have Node.js installed on your machine.

#### Prerequisites

To successfully set up and contribute to the project, you will need to meet the following prerequisites:

- **Node.js**: Ensure you have the Node.js version specified in the `.nvmrc` file.

- **GitLeaks**: **Gitleaks** is required for scanning sensitive data in the codebase and preventing it from being pushed to the repository. You **must** install **gitleaks** and add it to your system’s `PATH` to push any changes.

    **Installation Instructions**:
    1. Visit the official [GitLeaks releases page](https://github.com/gitleaks/gitleaks/releases).
    2. Download the appropriate version for your operating system:
        - **Windows**: `gitleaks-windows-amd64`
        - **Mac**: `gitleaks-darwin-amd64`
        - **Linux**: `gitleaks-linux-amd64`
    3. Extract the downloaded file to a folder (e.g., `C:\gitleaks` for Windows, `~/gitleaks` for Mac/Linux).
    
    **Add Gitleaks to your PATH**:
    
    - **Windows**:
        1. Search for **Environment Variables** in the Windows search bar and open it.
        2. In the **System Properties** window, click on **Environment Variables**.
        3. Under **System Variables**, select `Path`, and click **Edit**.
        4. Click **New** and add the path to the folder where you extracted **gitleaks** (e.g., `C:\gitleaks`).
        5. Click **OK** to save the changes and restart your terminal or command prompt.
        6. Verify the installation with `gitleaks --version`.

    - **Mac**:
        1. Open a terminal and extract the `gitleaks-darwin-amd64` file to a folder (e.g., `~/gitleaks`).
        2. Add the following line to your `.bash_profile` (for Bash) or `.zshrc` (for Zsh) file:
            ```bash
            export PATH="$PATH:~/gitleaks"
            ```
        3. Run `source ~/.bash_profile` (for Bash) or `source ~/.zshrc` (for Zsh) to apply the changes.
        4. Verify the installation with `gitleaks --version`.

    - **Linux**:
        1. Open a terminal and extract the `gitleaks-linux-amd64` file to a folder (e.g., `~/gitleaks`).
        2. Add the following line to your `.bashrc` or `.zshrc` file:
            ```bash
            export PATH="$PATH:~/gitleaks"
            ```
        3. Run `source ~/.bashrc` (for Bash) or `source ~/.zshrc` (for Zsh) to apply the changes.
        4. Verify the installation with `gitleaks --version`.

#### Important Note

1. Install specific version of Node.js

        nvm install $(cat .nvmrc)

        nvm use

#### Clone the repository to your local machine. 

2. Open your terminal or command prompt.

        git clone https://github.com/learnhubmkd/app.git

3. Navigate to the project directory to install dependencies run:
 
        npm install
   or

       yarn install
     
4. Start the development server with:
   
       npm run dev
   or

       yarn dev

5. Open [localhost:3000](http://localhost:3000) in your browser to explore the app.


## License
LearnHub.mk is licensed under the MIT License. See the LICENSE file for more details.
