var React = require('react');
const Card = require('material-ui/lib/card/card');
const CardMedia = require('material-ui/lib/card/card-media');
const CardTitle = require('material-ui/lib/card/card-title');

var creerCompte = React.createClass({
    render: function () {
        var styles = {
            'card' : {
                'margin' : '10px'
            }
        };
        return <Card style={styles.card}>
            <CardMedia overlay={<CardTitle title={this.props.danger.title} subtitle={this.props.danger.description}/>}>
                <img src={this.props.danger.images[0]}/>
            </CardMedia>
        </Card>;
    }
});

module.exports = creerCompte;