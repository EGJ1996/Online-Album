import { Component,ElementRef,OnInit} from '@angular/core';
import {Auth} from '../../services/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {Router,ActivatedRoute} from '@angular/router';
import * as fire from 'firebase';

@Component({
    selector: 'slide',
    templateUrl: './slideshow.html'
})

export class SlideshowComponent implements OnInit{
    currAlbum:any;
    allPhotos:any[]=[];
    albkey:any;
    profile:any;
    constructor(private element: ElementRef,private af:AngularFire,private active:ActivatedRoute) {}
    ngAfterViewInit(){
            var counter = 0, // to keep track of current slide
    $items = $('.diy-slideshow figure'), // a collection of all of the slides, caching for performance
    numItems = $items.length; // total number of slides

// this function is what cycles the slides, showing the next or previous slide and hiding all the others
var showCurrent = function(){
    var itemToShow = Math.abs(counter%numItems);// uses remainder (aka modulo) operator to get the actual index of the element to show  
   
  $items.removeClass('show'); // remove .show from whichever element currently has it
  $items.eq(itemToShow).addClass('show');    
};

// add click events to prev & next buttons 
$('.next').on('click', function(){
    counter++;
    showCurrent(); 
});
$('.prev').on('click', function(){
    counter--;
    showCurrent(); 
});

// if touch events are supported then add swipe interactions using TouchSwipe https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
if('ontouchstart' in window){
  $('.diy-slideshow').swipe({
    swipeLeft:function() {
      counter++;
      showCurrent(); 
    },
    swipeRight:function() {
      counter--;
      showCurrent(); 
    }
  });
}
    }
    checkItem(it,lst){
        for(var i=0;i<lst.length;i++){
            if(it['lnk']==lst[i]['lnk'] && it['desc']==lst[i]['desc']){
                return true;
            }
        }
        return false;
    }
    ngOnInit(){
        var profile = JSON.parse(localStorage.getItem('profile'));
        this.active.params.subscribe((param:any)=>{
            this.albkey=param['key'];
            console.log("The key is "+this.albkey);
            this.profile = JSON.parse(localStorage.getItem('profile'));
        });
        this.af.database.list('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/albums/'+this.albkey).subscribe(data=>{
            data.forEach(item=>{
                console.log(item);
                if(item['link'] && item['type']=='image/jpeg'){
                    console.log('This item has a link');
                    console.log(item['link']);
                    var newItem={
                        lnk:item['link'],
                        desc:item['description']
                    };
                    if(this.checkItem(newItem,this.allPhotos)==false){
                        this.allPhotos.push(newItem);
                    }
                    //this.allPhotos.push(newItem);
                }
                });
        });
        console.log(this.allPhotos);
    }
}
