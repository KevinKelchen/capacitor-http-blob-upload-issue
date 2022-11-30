import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private httpClient: HttpClient) {}

  async fileChanged(event: any) {
    const file = event.target.files[0];

    // Clear the input so that if the next selection attempt contains the same files
    // the change event will still trigger.
    event.target.value = null;

    // In our production app, we are uploading files to our server and sending the File
    // Blob *without* using FormData.
    // For this repro, file.io seemed like a simple, reasonable solution for
    // an endpoint that accepts file upload.
    // However, it seems to require the use of FormData.
    const formData = new FormData();
    formData.append('file', file);

    const result = await lastValueFrom(
      this.httpClient.post('https://file.io/', formData)
    );

    console.log(result);
  }
}
