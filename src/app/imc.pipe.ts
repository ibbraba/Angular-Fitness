import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imc'
})
export class ImcPipe implements PipeTransform {

  transform( weight: number, height: number): number {
     if (!weight || !height || height === 0) return 0;

      const heightInMeters = height / 100;
    const imc = weight / (heightInMeters * heightInMeters);

    return Math.round(imc * 10) / 10; 
  }

}
