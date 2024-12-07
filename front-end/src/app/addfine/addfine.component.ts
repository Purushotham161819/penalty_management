import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { HttpHeaders } from '@angular/common/http';  // Import HttpHeaders


@Component({
  selector: 'app-addfine',
  standalone: false,
  
  templateUrl: './addfine.component.html',
  styleUrl: './addfine.component.css'
})
export class AddfineComponent {

  firstName: string = '';
  lastName: string = '';
  violation: string = '';
  amount: number = 0;
  dueDate: string = '';
  message: string = '';

  private apiUrl = 'http://localhost:3000/add'; // Backend API endpoint
  constructor(private http: HttpClient) {}

  onSubmit(): void {
    // Validate form data before sending it to the backend
    if (!this.firstName || !this.lastName || !this.violation || !this.amount || !this.dueDate) {
      this.message = 'All fields are required!';
      return;
    }

    // Create the payload to send to the backend
    const body = {
      firstName: this.firstName,
      lastName: this.lastName,
      violation: this.violation,
      amount: this.amount,
      dueDate: this.dueDate
    };

    // Set headers for the POST request
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Make the HTTP POST request to the backend
    this.http.post(this.apiUrl, body, { headers }).subscribe({
      next: (response: any) => {
        this.message = response.message || 'Fine added successfully!';
        // Clear form fields after successful submission
        this.firstName = '';
        this.lastName = '';
        this.violation = '';
        this.amount = 0;
        this.dueDate = '';
      },
      error: (error) => {
        console.error('Error:', error);
        this.message = error.error.message || 'An error occurred while adding the fine.';
      }
    });
  }

}
