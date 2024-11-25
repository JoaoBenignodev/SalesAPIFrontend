# Java Sales - API
## How to run the project locally
The instructions below are going to let you locally run a copy of the project's frontend, on your own machine.
### Clone the repository:
```bash
git clone https://github.com/JoaoBenignodev/SalesAPIFrontend.git
```
> [!TIP]
> To run `git` commands in your system, you'll need to have **git** installed. For that, access [Git's official page](https://git-scm.com/).
### Executing the project:
Using your preferred IDE, open the project you've cloned.
</br>
After opening the project's folder, using an integrated or dedicated terminal, run the command below to install the project's dependencies:

```bash
npm install #installs the project's node dependencies
```
> [!TIP]
> To run `npm` commands in your system, you'll need to have **Node.Js** installed. For that, access [Node's official page](https://nodejs.org/en).

After the installation of the project's dependencies, you can run the project using the command:

```bash
npm start #starts the react application
```
### Accessing the Frontend:
After running the project successfully, you can access the frontend "homepage" with this [link](http://localhost:3000/).
#### Applcation routes mapping:
Here's the map to each page of the application.
- [Users (Customers) registration form](http://localhost:3000/users/add/)
- [Users listing table](http://localhost:3000/users/)
- [Products registration form](http://localhost:3000/products/add/)
- [Products listing table](http://localhost:3000/products/)
- [Sales registration form](http://localhost:3000/sales/add)
- [Sales listing table](http://localhost:3000/sales/)
> [!NOTE]
> To be able to test and debug the project's frontend, the [project's backend](https://github.com/JoaoBenignodev/SalesAPIBackend) needs to have been **cloned** already, and executed. 