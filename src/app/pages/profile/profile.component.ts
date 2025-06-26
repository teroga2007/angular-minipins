// profile.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  editingField: string = '';
  user = {
    name: '',
    bio: '',
  };

  defaultPhoto = 'https://via.placeholder.com/96?text=👤';

  ngOnInit(): void {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      this.user = JSON.parse(storedProfile);
    }
  }

  saveProfile() {
    localStorage.setItem('profile', JSON.stringify(this.user));
  }

  onPhotoSelected() {
    alert('photo changed');
  }

  logout() {
    localStorage.removeItem('user');
    window.location.reload();
  }
}
