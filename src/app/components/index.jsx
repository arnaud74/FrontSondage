var React = require('react');
const FloatingActionButton = require('material-ui/lib/floating-action-button');
const FlatButton = require('material-ui/lib/flat-button');
const DangerCard = require('./dangerCard.jsx');
const Dialog = require('material-ui/lib/dialog');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
var EmbedMap = require('./EmbedMap.jsx');
import {GoogleMap, Marker} from "react-google-maps";
import RaisedButton from 'material-ui/lib/raised-button';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import ActionCircle from 'material-ui/lib/svg-icons/action/check-circle';
import Checkbox from 'material-ui/lib/checkbox';
import ActionFavoriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

var $ = require('jquery');

var Index = React.createClass({

    getInitialState: function () {
        return {questions:[],key:1};
    },

    render: function () {
        var _this = this;

        var styles = {
            "addButton": {
                "top": 0,
                "right": 0,
                "margin": "15px"
            }
        };

        let actions = [
            {text: 'Annuler'},
            {text: 'Creer', onTouchTap: this._onDialogSubmit, ref: 'submit'}
        ];

        return <div>
            <RaisedButton label="Sondage" onTouchTap={this._handleChangePage}/>
            <RaisedButton label="Creer sondage" onTouchTap={this._handleCreerSondage}/>
            <RaisedButton label="Creer user" onTouchTap={this._handleAddButtonPressed}/>


            <div ref="CreerSondage" style={{display:"none"}}>
                <TextField
                    hintText="Title"
                    ref="title"
                    onChange={this._handleTitleChanged}
                /><br/>
                <TextField
                    hintText="Temps réponse"
                    ref="time"
                    onChange={this._handleTimeChanged}
                />
                <TextField
                    hintText="Nombre de reponses"
                    ref="nbrep"
                />
                <Table
                    selectable={false}
                    ref="table">
                    <TextField
                        hintText="Contenu"
                        ref="contenuQuestion"
                    />
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Valide</TableHeaderColumn>
                            <TableHeaderColumn>Contenu</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        ref="tablebodyreponse">

                        <TableRow>
                            <TableRowColumn><Checkbox

                            />
                            </TableRowColumn>
                            <TableRowColumn><TextField
                                hintText="Contenu"
                                ref="contenu"
                                onChange={this._handleContenuChanged}
                            /></TableRowColumn>
                        </TableRow>
                        {
                            this.state.questions.map(function(question){
                                return <TableRow key={question.key}>
                                    <TableRowColumn><Checkbox

                                    />
                                    </TableRowColumn>
                                    <TableRowColumn><TextField
                                        hintText="Contenu"
                                        ref="contenu"
                                        onChange={_this._handleContenuChanged}
                                    /></TableRowColumn>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
                <FloatingActionButton style={styles.addButton} onTouchTap={this._addRow}>
                    <ContentAdd />
                </FloatingActionButton>
                <br/>
                <RaisedButton label="Creer" onTouchTap={this._addSondage}/>
            </div>

            <Dialog
                title="Creer un compte"
                actions={actions}
                ref="addCompte">
                <TextField
                    hintText="Username"
                    ref="username"
                    onChange={this._handleUserNameChanged}/><br/>
                <TextField
                    hintText="Email"
                    type="email"
                    ref="email"
                    onChange={this._handleEmailChanged}/><br/>
                <TextField
                    hintText="Passsword"
                    ref="password"
                    type="password"
                    onChange={this._handlePassChanged}/><br/>
                <TextField
                    hintText="Passsword"
                    ref="password2"
                    type="password"
                    onChange={this._handlePass2Changed}/>
            </Dialog>
            <Dialog
                title="Ajouter un sondage"
                actions={actions}
                ref="addSondage">
                <TextField
                    hintText="Title"
                    ref="title"
                    onChange={this._handleTitleChanged}/><br/>
                <TextField
                    hintText=""
                />

            </Dialog>
        </div>;
    },

    _addSondage: function (event){
      console.log("add");
    },

    _addRow: function (event) {
        var questions = this.state.questions;
        var key = this.state.key;
        questions.push({key:key});
        this.setState({key:key+1});
        this.setState({questions:questions});
    },

    _handleCreerSondage: function (event) {
        this.refs.CreerSondage.style.display = this.refs.CreerSondage.style.display == "none" ? "block" : "none";
    },

    _handleUserNameChanged: function (event) {
        this.username = event.target.value;
    },

    _handleEmailChanged: function (event) {
        this.email = event.target.value;
    },

    _handlePassChanged: function (event) {
        this.password = event.target.value;
    },

    _handlePass2Changed: function (event) {
        this.password2 = event.target.value;
    },

    _handleAddButtonPressed: function () {
        this.refs.addCompte.show()
    },

    _handleSearchChanged: function (event) {
        this.setState({
            search: event.target.value
        });
        var query = {search: event.target.value};
        $.post("http://10.7.244.130/:3000/api/danger/search",
            query,
            function (result) {
                this.setState({
                    danger: result.hits.hits
                });
            }.bind(this));
    },

    _onDialogSubmit: function () {
        if (this.password == this.password2) {
            var query = {
                password: this.password,
                username: this.username,
                email: this.email
            };
            $.post("http://10.7.244.107:3000/api/users",
                query,
                function (result) {
                    console.log(result);
                }.bind(this));
            this.refs.addCompte.dismiss();
            //this.refreshList();
        }
    }
});

module.exports = Index;