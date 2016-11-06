import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AlbumComponent} from './components/album/albumlist.component';
import {AuthGuard} from './auth.guard';
import {CreateAlbumComponent} from './components/album/createalbum.component';
import {PhotoAlbComponent} from './components/album/indalb.component';
import {AlbumPhotoComponent} from './components/album/viewPhotos.component';
import {SlideshowComponent} from './components/album/slideshow.component';
import {FriendComponent} from './components/album/friend.component';
const appRoutes: Routes= [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'profile',
        component:ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'album',
        component:AlbumComponent
    },
    {
        path:'createalbum',
        component:CreateAlbumComponent
    },
    {
        path:'album/addphoto/:key',
        component:PhotoAlbComponent
    },
    {
        path:'album/viewphoto/:key',
        component:AlbumPhotoComponent
    },
    {
        path:'album/slide/:key',
        component:SlideshowComponent
    },
    {
        path:'users',
        component:FriendComponent
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);