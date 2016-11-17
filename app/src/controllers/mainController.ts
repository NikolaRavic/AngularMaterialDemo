/**
 * Created by Nikola on 11/15/2016.
 */
module ContactManagerApp {
    export class MainController {
        static $inject = ['userService','$mdSidenav'];

        constructor(private userService : IUserService,
        private $mdSidenav: angular.material.ISidenavService) {
            let self = this;

            this.userService
                .loadAllUsers()
                .then((users: User[]) => {
                self.users = users;
                console.log(self.users);
            });
        }

        users: User[] = [];
        message: string = "Hello from our controller";

        toggleSideNav() : void {
            this.$mdSidenav('left').toggle();
        }
    }
}