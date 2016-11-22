/**
 * Created by Nikola on 11/15/2016.
 */
/// <reference path="../_all.ts" />
var ContactManagerApp;
(function (ContactManagerApp) {
    var MainController = (function () {
        function MainController(userService, $mdSidenav, $mdToast, $mdDialog, $mdMedia, $mdBottomSheet) {
            this.userService = userService;
            this.$mdSidenav = $mdSidenav;
            this.$mdToast = $mdToast;
            this.$mdDialog = $mdDialog;
            this.$mdMedia = $mdMedia;
            this.$mdBottomSheet = $mdBottomSheet;
            this.tabIndex = 0;
            this.searchText = '';
            this.selected = null;
            this.foundIndex = null;
            this.users = [];
            this.newNote = new ContactManagerApp.Note('', null);
            this.deletedNote = null;
            var self = this;
            this.userService
                .loadAllUsers()
                .then(function (users) {
                self.users = users;
                self.selected = users[0];
                self.userService.selectedUser = self.selected;
                console.log(self.users);
            });
        }
        MainController.prototype.toggleSideNav = function () {
            this.$mdSidenav('left').toggle();
        };
        MainController.prototype.selectUser = function (user) {
            this.selected = user;
            this.userService.selectedUser = user;
            var sidenav = this.$mdSidenav('left');
            if (sidenav.isOpen()) {
                sidenav.close();
            }
            this.tabIndex = 0;
        };
        MainController.prototype.addNote = function () {
            this.selected.notes.push(this.newNote);
            this.newNote = new ContactManagerApp.Note('', null);
            this.openToast('Note added', false);
            this.noteForm.$setPristine();
            this.noteForm.$setUntouched();
        };
        MainController.prototype.removeNote = function (note) {
            this.deletedNote = note;
            this.foundIndex = this.selected.notes.indexOf(note);
            this.selected.notes.splice(this.foundIndex, 1);
            this.openToast("Note successfully removed!", true);
        };
        MainController.prototype.openToast = function (message, action) {
            var _this = this;
            var toast = this.$mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(3000);
            if (action) {
                toast.action('undo');
            }
            this.$mdToast.show(toast).then(function (response) {
                if (response == 'ok') {
                    _this.selected.notes.push(_this.deletedNote);
                }
            });
        };
        MainController.prototype.showContactOptions = function ($event) {
            this.$mdBottomSheet.show({
                parent: angular.element(document.getElementById('wrapper')),
                templateUrl: './dist/view/contactSheet.html',
                controller: ContactManagerApp.ContactPanelController,
                targetEvent: $event,
                controllerAs: 'cp',
                bindToController: true
            }).then(function (clickedItem) {
                clickedItem && console.log(clickedItem.name + ' clicked!');
            });
        };
        MainController.prototype.addUser = function ($event) {
            var self = this;
            var useFullScreen = (this.$mdMedia('md') || this.$mdMedia('sm') || this.$mdMedia('xs') || this.$mdMedia('lg'));
            this.$mdDialog.show({
                templateUrl: './dist/view/newUserDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: ContactManagerApp.AddUserDialogController,
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            }).then(function (user) {
                var newUser = ContactManagerApp.User.fromCreate(user);
                self.users.push(newUser);
                self.selectUser(newUser);
                self.openToast('User added', false);
            }, function () {
                console.log('You cancelled the dialog.');
            });
        };
        MainController.prototype.clearNotes = function ($event) {
            var confirm = this.$mdDialog.confirm()
                .title('Are you sure you want to delete all notes?')
                .textContent('All notes will be deleted, you cant\'t undo this action.')
                .targetEvent($event)
                .ok('Yes')
                .cancel('No');
            var self = this;
            this.$mdDialog.show(confirm).then(function () {
                self.selected.notes = [];
                self.openToast('Cleared notes', false);
            });
        };
        MainController.$inject = [
            'userService',
            '$mdSidenav',
            '$mdToast',
            '$mdDialog',
            '$mdMedia',
            '$mdBottomSheet'];
        return MainController;
    }());
    ContactManagerApp.MainController = MainController;
})(ContactManagerApp || (ContactManagerApp = {}));
//# sourceMappingURL=mainController.js.map