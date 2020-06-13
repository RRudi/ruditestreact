import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import TempsRestant from './TempsRestant';
import TempsPriere from './TempsPriere';
import HeureProchainePriere from './HeureProchainePriere';
import Pourcentage from './Pourcentage';

class Priere {
  EstPriere;
  Classement;
  Libelle;
  Rakat;
  RakatAvant;
  RakatApres;
  Horaire;
  Debut;
  Fin;
  FinVirtuelle;
  EstSilencieuse;
}

export default class Informations extends Component {
  
  
  urlApi = "https://api.aladhan.com/timingsByAddress/10-06-2020?address=Paris,France&midnightmode=1&method=99&methodSettings=17,null,14&tune=0,1,0,0,-1,3,3,-2,0,0";
  listePriereBloquee = ["Imsak", "Sunset", "Midnight"];

  constructor(props) {
    super(props);
    this.state = {
      listePriere: [],
      priereActuelle: '',
      fromNow: '',
      pourcentage: ''
    }
  }

  componentDidMount() {

    moment.updateLocale('fr', {
      relativeTime : {
          future: "dans %s",
          s  : 'dans quelques secondes',
          ss : '%d secondes',
          m:  "une minute",
          mm: "%d minutes",
          h:  "une heure",
          hh: "%d heures"
      }
    });

    axios.get(this.urlApi).then(reponse => {

        const horaires = reponse.data.data.timings;
        const listePriere = [];

        // Récupérer les horaires de prières depuis API
        for (let element in horaires) 
        {
          if(!this.listePriereBloquee.includes(`${element}`))
          {
            const libelle = `${element}`;
            const horaire = `${horaires[element]}`;

            const nouvellePriere = new Priere();
            nouvellePriere.Libelle = libelle;
            nouvellePriere.Horaire = horaire;
            nouvellePriere.Debut = this.spliterHoraireEtGetTimestampUTC(horaire);
            nouvellePriere.Fin = "";

            listePriere.push(nouvellePriere);
          }
        }

        // Cacluls pour ajout des 3 limites virtuelles
        const horaireFajr = moment(listePriere.find( x => x.Libelle === 'Fajr').Debut);
        const horaireMaghib = moment(listePriere.find( x => x.Libelle === 'Maghrib').Debut);
        const horaireLimiteAsr = horaireMaghib.clone().subtract(30, 'm');
        const horaireFajrProchain = horaireFajr.clone().add(1, 'd');
        const differenceMinutes = horaireFajrProchain.diff(horaireMaghib, 'h', true);
        const horaireMidnight = horaireMaghib.clone().add(differenceMinutes/2, 'h');

        const nouvellePriere = new Priere();
        nouvellePriere.Classement = 0;
        nouvellePriere.EstPriere = false;
        nouvellePriere.EstSilencieuse = false;
        nouvellePriere.Rakat = 0;
        nouvellePriere.RakatAvant = 0;
        nouvellePriere.RakatApres = 0;
        nouvellePriere.Libelle = "FajrProchain";
        nouvellePriere.Libelle = "FajrProchain";
        nouvellePriere.Horaire = horaireFajrProchain.hours() + ':' + horaireFajrProchain.minute();
        nouvellePriere.Debut = horaireFajrProchain.format();
        nouvellePriere.Fin = "";
        listePriere.push(nouvellePriere);

        const nouvellePriere = new Priere();
        nouvellePriere.Classement = 0;
        nouvellePriere.EstPriere = false;
        nouvellePriere.EstSilencieuse = false;
        nouvellePriere.Rakat = 0;
        nouvellePriere.RakatAvant = 0;
        nouvellePriere.RakatApres = 0;
        nouvellePriere.Libelle = "Midnight";
        nouvellePriere.Horaire = "horaire";
        nouvellePriere.Debut = horaireMidnight.format();
        nouvellePriere.Fin = horaireFajrProchain.format();
        listePriere.push(nouvellePriere);

        const nouvellePriere = new Priere();
        nouvellePriere.Classement = 0;
        nouvellePriere.EstPriere = false;
        nouvellePriere.EstSilencieuse = false;
        nouvellePriere.Rakat = 0;
        nouvellePriere.RakatAvant = 0;
        nouvellePriere.RakatApres = 0;
        nouvellePriere.Libelle = "LimiteAsr";
        nouvellePriere.Horaire = horaireLimiteAsr.hours() + ':' + horaireLimiteAsr.minute();
        nouvellePriere.Debut = horaireLimiteAsr.format();
        nouvellePriere.Fin = horaireMaghib.format();
        listePriere.push(nouvellePriere);

        // Mise en place des heures de Fin pour chaque prière
        listePriere.sort((a, b) => moment(a.Debut) - moment(b.Debut))

        const fajr = listePriere.find( x => x.Libelle === 'Fajr');
        const sunrise = listePriere.find( x => x.Libelle === 'Sunrise');
        const dhuhr = listePriere.find( x => x.Libelle === 'Dhuhr');
        const asr = listePriere.find( x => x.Libelle === 'Asr');
        const limiteAsr = listePriere.find( x => x.Libelle === 'LimiteAsr');
        const maghrib = listePriere.find( x => x.Libelle === 'Maghrib');
        const isha = listePriere.find( x => x.Libelle === 'Isha');
        const midnight = listePriere.find( x => x.Libelle === 'Midnight');

        fajr.Fin = sunrise.Debut;
        fajr.Classement = 1;
        fajr.EstPriere = true;
        fajr.EstSilencieuse = false;
        fajr.Rakat = 2;
        fajr.RakatAvant = 2;
        fajr.RakatApres = 0;

        sunrise.Fin = dhuhr.Debut;
        sunrise.Classement = 0;
        sunrise.EstPriere = true;
        sunrise.EstSilencieuse = false;
        sunrise.Rakat = 0;
        sunrise.RakatAvant = 0;
        sunrise.RakatApres = 0;

        dhuhr.Fin = asr.Debut;
        dhuhr.Classement = 2;
        dhuhr.EstPriere = true;
        dhuhr.EstSilencieuse = true;
        dhuhr.Rakat = 4;
        dhuhr.RakatAvant = 4;
        dhuhr.RakatApres = 2;

        asr.Fin = limiteAsr.Debut;
        asr.Classement = 3;
        asr.EstPriere = true;
        asr.EstSilencieuse = true;
        asr.Rakat = 4;
        asr.RakatAvant = 0;
        asr.RakatApres = 0;

        maghrib.Fin = isha.Debut;
        maghrib.Classement = 4;
        maghrib.EstPriere = true;
        maghrib.EstSilencieuse = false;
        maghrib.Rakat = 3;
        maghrib.RakatAvant = 0;
        maghrib.RakatApres = 2;

        isha.Fin = midnight.Debut;
        isha.Classement = 5;
        isha.EstPriere = true;
        isha.EstSilencieuse = false;
        isha.Rakat = 4;
        isha.RakatAvant = 0;
        isha.RakatApres = 2;

        // Selection de la priere en cours
        const priereActuelle = listePriere.find( x => moment(x.Debut) < moment() && moment(x.Fin) > moment())

        // Mise à jour du State
        this.setState({
          listePriere,
          priereActuelle
        });
      })
  }

  spliterHoraireEtGetTimestampUTC(horaire){

    const horaireSplit = horaire.split(':');
    const heure = horaireSplit[0];
    const minutes = horaireSplit[1];
    const nouvelleDate = moment().set({'hour': heure, 'minute': minutes});
    return nouvelleDate.format();
  }

  render() {
    return (
      <div className="p-3 w-75">
        { this.state.priereActuelle == '' ? 'Chargement...' : (
          <div>
            <TempsPriere priere = { this.state.priereActuelle } />
            <br />
            <Pourcentage priere = { this.state.priereActuelle } />
            <br />
            <HeureProchainePriere priere = { this.state.priereActuelle } />
          </div>
        )}
      </div>
    )
  }
}