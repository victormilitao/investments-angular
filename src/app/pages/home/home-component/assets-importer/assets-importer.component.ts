import { Component } from '@angular/core';

@Component({
  selector: 'assets-importer',
  templateUrl: './assets-importer.component.html',
  styleUrls: ['./assets-importer.component.scss'],
})
export class AssetsImporterComponent {
  selectedFileName: string = ''

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFileName = file ? file.name : '';
    console.dir(file)
  }
}
