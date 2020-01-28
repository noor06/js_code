import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "filter"
})
export class HospitalSearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(data => {
      return data.name.toLowerCase().includes(searchText);
    });
  }
}
