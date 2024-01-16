<a name="readme-top"></a>

# <img width="25" alt="Logo" src="https://github.com/imvinojanv/gplus-gpa-calculator/assets/48822560/edfad536-1254-467a-8f89-11639a05ac28"> G Plus : Academic Performance Tracker

<img width="1920" alt="GPlus - Landing page" src="https://github.com/imvinojanv/gplus-gpa-calculator/assets/48822560/c9fe5c26-2453-47d7-af44-697789ffc4d8">

## 🌟Features:
- 📈 <b>Academic Performance Tracking</b>: Real-time updates on your GPA and performance.
- 🔒 <b>Secure Authentication</b>: Your data, your privacy – log in with confidence!
- 📋 <b>Personal Academic Results Note</b>: Dive deep into your individual course results.
- 🎨 <b>Modern Design</b>: An intuitive, sleek interface for a seamless experience.
- 📱 <b>Mobile Responsiveness</b>: Access G-Plus anytime, anywhere, on any device.
- 🏫 <b>Available for all Universities</b>: Dedicated dashboard for Each University's Degrees
- 🚀 <b>Admin Management</b>: Update your university's degree programs
- 🌐 <b>Open-source Contribution</b>: Contribute on GitHub, expand coverage, and shape the academic future together!

## Build with
[![Next][Next.js]][Next-url] [![React][React.js]][React-url] [![TypeScript][TypeScript]][TypeScript-url] [![Supabase][Supabase]][Supabase-url] [![Clerk][Clerk-auth]][Clerk-url] [![ReactQuery][React-query]][ReactQuery-url] 
[![Sanity][Sanity.io]][Sanity-url] [![ShadcnUI][Shadcn-ui]][Shadcn-url] [![TailwindCSS][Tailwind-css]][Tailwind-url]

<br />

## Getting Started 🎉
To get a local copy up and running on your machine, follow these simple steps.

### Prerequisites
Downloading and installing Node.js and npm
  ```sh
  npm install npm@latest -g
  ```

### Installation
1.  Clone the repository
   ```sh
   git clone https://github.com/imvinojanv/gplus-gpa-calculator.git
   ```
2.  Install NPM packages
   ```sh
   npm install
   ```
3.  Create .env file with keys
4.  Run the application
   ```sh
   npm run dev
   ```

### Sample .env file
```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
 ```
Contact me for the production keys and other credentials. 

<p align="right"><a href="#readme-top">back to top ☝️</a></p>

## Schema Structure 🛢️
It's sample schema model structure for sanity and supabase DB

### Sanity Schema
| Schema Model | Field Name (Type) | Relation |
| --- | --- | --- |
| **university** | - `name` (string)<br>- `slug` (string)<br>- `logo` (image) | `of` reference to 'degree' schema |
| **degree** | - `name` (string)<br>- `degree` (string)<br>- `faculty` (string)<br>- `duration` (number) | `of` reference to 'course' schema |
| **course** | - `name` (string)<br>- `courseCode` (string)<br>- `credits` (number)<br>- `year` (number)<br>- `semester` (number)<br>- `courseType` (string) | `to` reference to 'degree' schema |

### Supabase DB Schema
| Schema Model | Field Name (Type) |
| --- | --- |
| **degree** | - `user_id` (string)<br>- `degree_id` (string)<br>- `slug` (string)<br>- `year1_gpa` (number)<br>- `year2_gpa` (number)<br>- `year3_gpa` (number)<br>- `year4_gpa` (number)<br>- `created_at` (date)<br>- `updated_at` (date) |
| **course** | - `course_id` (string)<br>- `user_id` (string)<br>- `degree_id` (string)<br>- `slug` (string)<br>- `name` (string)<br>- `credits` (number)<br>- `gpa` (number)<br>- `year` (number)<br>- `semester` (number)<br>- `isSelected` (boolean)<br>- `created_at` (date)<br>- `updated_at` (date) |

## Contribution ✨
Contributions are what makes the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star!⭐ Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/NewFeature`)
3.  Commit your Changes (`git commit -m 'Add some NewFeatures'`)
4.  Push to the Branch (`git push origin feature/NewFeature`)
5.  Open a Pull Request

<!-- CONTRIBUTORS -->
### Contributors 🤝
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/imvinojanv">
          <img src="https://avatars.githubusercontent.com/u/48822560?v=4?s=100" width="100px;" alt="Vinojan"/><br />
          <b>Vinojan Veerapathirathasan</b>
        </a><br />
        <a href="https://github.com/imvinojanv/gplus-gpa-calculator/commits?author=imvinojanv" title="Developed">💻</a> 
        <a href="#docs-imvinojanv" title="Documentation">📑</a> 
        <a href="#test-imvinojanv" title="Test">🛠️</a> 
        <a href="#infra-imvinojanv" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> 
        <a href="#question-imvinojanv" title="Answering Questions">💬</a> 
        <a href="#security-imvinojanv" title="Security">🛡️</a></td>
    </tr>
  </tbody>
</table>

<p align="right"><a href="#readme-top">back to top ☝️</a></p>

<!-- CONTACT -->
### Contact 💌
<b>Vinojan Veerapathirathasan</b>

Email: [vinojan@dechorizon.com](mailto:vinojan@dechorizon.com)<br />
LinkedIn: [@imvinojanv](https://www.linkedin.com/in/imvinojanv)

<p align="right"><a href="#readme-top">back to top ☝️</a></p>

<!-- LICENSE -->
### License ©️
MIT © [imvinojanv](https://github.com/imvinojanv)

<!-- BUILD WITH URLs -->
[Next.js]: https://img.shields.io/badge/next_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/Typescript-007acc?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/ 
[Supabase]: https://img.shields.io/badge/Supabase-1c1c1c?style=for-the-badge&logo=supabase&logoColor=3ecf8e
[Supabase-url]: https://supabase.com/
[Clerk-auth]: https://img.shields.io/badge/Clerk-1f0157?style=for-the-badge&logo=clerk&logoColor=24acfd
[Clerk-url]: https://clerk.com/
[Shadcn-ui]: https://img.shields.io/badge/Shadcn_UI-09090b?style=for-the-badge&logo=shadcnui&logoColor=white
[Shadcn-url]: https://ui.shadcn.com/
[Sanity.io]: https://img.shields.io/badge/Sanity-f9b3ae?style=for-the-badge&logo=sanity&logoColor=f03e2f
[Sanity-url]: https://www.sanity.io/
[Tailwind-css]: https://img.shields.io/badge/Tailwind-161d2d?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8
[Tailwind-url]: https://tailwindcss.com/
[React-query]: https://img.shields.io/badge/React_Query-001b2d?style=for-the-badge&logo=reactquery&logoColor=ff4355
[ReactQuery-url]: https://www.npmjs.com/package/react-query


