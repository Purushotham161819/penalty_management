import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';  // Import OnInit separately

// Define an interface for the record data
interface Record {
  id: string;
  firstName: string;
  lastName: string;
  violation: string;
  amount: number;
  dueDate: string;
}


@Component({
  selector: 'app-display',
  standalone: false,
  
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit {
  records: Record[] = []; // Array to store fetched records
  errorMessage: string = ''; // Store error message

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRecords();
  }

  fetchRecords(): void {
    const apiUrl = 'http://localhost:3000/getRecords'; // Backend endpoint
    this.http.get<Record[]>(apiUrl).subscribe(
      (response) => {
        this.records = response; // Assign fetched data to `records`
        this.errorMessage = ''; // Reset error message if fetch is successful
      },
      (error) => {
        console.error('Error fetching records:', error);
        this.errorMessage = 'Failed to load records. Please try again later.'; // Show error message to user
      }
    );
  }


}