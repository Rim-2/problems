import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosInstance } from 'axios';
import { AlcoholRepository } from 'src/admin/alcohol/alcohol.repository';
import { LessThan } from 'typeorm';

@Injectable()
export class RecommendationService {
  private client: AxiosInstance;

  constructor(
    @InjectRepository(AlcoholRepository)
    private alcoholRepository: AlcoholRepository,
  ) {
    this.client = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5/',
      params: {
        APPID: 'c12bdbbf56bfc35592a66988f9acd4a1',
        units: 'metric'
      },
    });
  }

  // http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}
  // https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=58ba0d59c042d7dddb59c641427042e5&units=metric
  async getTodaysWeather(lat: string, lon: string): Promise<any> {
    const response = await this.client.get(
      //   'weather', {
      //   params: { q: city },
      // }
      'weather', {
      params: { lat: lat || "37.532600", lon: lon || "127.024612"}, // 디폴트는 서울 주소
    }
    );

    const mainWeather = response.data.weather[0].main; // 날씨
    const weatherDescription = response.data.weather[0].description; // 상세 날씨
    const temperature = response.data.main.temp; // 온도
    const icon = response.data.weather[0].icon;
    const city = response.data.name;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`; // 날씨 아이콘
    console.log(response.data);

    return [mainWeather, temperature, iconUrl, weatherDescription, city];
  }

  async getWeatherRecommendation(weather: string) {
    let select_cool = false;
    let select_clean = false;
    let select_bitter = false;
    let select_sweet = false;
    let select_sour = false;
    let select_refreshing = false;

    if (weather == 'clean') {
      select_sweet = true;
      select_refreshing = true;
      select_cool = true;
    }

    else if (weather == 'cloud') {
      select_bitter = true;
      select_clean = true;
    }

    else if (weather = 'rain') {
      select_sweet = true;
      select_cool = true;
    }

    else if (weather = 'snow') {
      select_sweet = true;
      select_clean = true;
    }

    else if (weather = 'shower rain') {
      select_bitter = true;
      select_cool = true;
    }

    else if (weather = 'thunderstorm') {
      select_refreshing = true;
      select_sour = true;
    }

    let resultArrays;
    let resultId;

  const resultArray1 = await this.alcoholRepository
            .createQueryBuilder('query1')
            .where("query1.cool = :select_cool", { select_cool })
            .andWhere("query1.clean = :select_clean", { select_clean })
            .andWhere("query1.bitter = :select_bitter", { select_bitter })
            .andWhere("query1.sweet = :select_sweet", { select_sweet })
            .andWhere("query1.refreshing = :select_refreshing", { select_refreshing })
            .andWhere("query1.sour = :select_sour", { select_sour })
            .orderBy("RANDOM()")
            .getMany();

            if (resultArray1.length >= 3) {
              resultArrays = [resultArray1[0], resultArray1[1], resultArray1[2]]
              return resultArrays;
            }
  
        
            // for (let i = 0; i < 3; i++) {
            // const resultId = await this.alcoholRepository
            //           .createQueryBuilder('ids')
            //           .select("ids.id", "id")
            //           .from(resultArrays[i])
            // } 중복을 제거하려고 들인 노력의 흔적,,,

  if (resultArray1.length < 3) {
    let resultArray2;
    if (weather == 'clean') {
      let select_others = true;  
      resultArray2 = await this.alcoholRepository
                .createQueryBuilder('query2')
                .andWhere("query2.id NOT IN (:...id)", { id: resultId })
                .where("query2.sweet = :select_sweet", { select_sweet })
                .andWhere("query2.refreshing = :select_refreshing", { select_refreshing })
                .andWhere("query2.cool = :select_cool", { select_cool })
                .orderBy("RANDOM()")
                .getMany();
    }

    else if (weather == 'cloud') {
      let select_others = true; 
      resultArray2 = await this.alcoholRepository
                .createQueryBuilder('query2')
                .andWhere("query2.id NOT IN (:...ids)", { ids: resultId })  
                .andWhere("query2.bitter = :select_bitter", {select_bitter})
                .andWhere("query2.clean = :select_clean", {select_clean})
                .orderBy("RANDOM()")
                .getMany();
    }

    else if (weather = 'rain') {
      let select_others = true; 
      resultArray2 = await this.alcoholRepository
                .createQueryBuilder('query2')
                .andWhere("query2.id NOT IN (:...ids)", { ids: resultId })
                .andWhere("query2.sweet = :select_sweet", {select_sweet})
                .andWhere("query2.cool = :select_cool", {select_cool})
                .orderBy("RANDOM()")
                .getMany();
    }

    else if (weather = 'snow') {
      let select_others = true; 
      resultArray2 = await this.alcoholRepository
                .createQueryBuilder('query2')
                .andWhere("query2.id NOT IN (:...ids)", { ids: resultId })
                .andWhere("query2.sweet = :select_sweet", {select_sweet})
                .andWhere("query2.clean = :select_clean", {select_clean})
                .orderBy("RANDOM()")
                .getMany();
    }

    else if (weather = 'shower rain') {
      let select_others = true;
      resultArray2 = await this.alcoholRepository
                .createQueryBuilder('query2')
                .andWhere("query2.id NOT IN (:...ids)", { ids: resultId })
                .andWhere("query2.bitter = :select_bitter", {select_bitter})
                .andWhere("query2.cool = :select_cool", {select_cool})
                .orderBy("RANDOM()")
                .getMany();
    }

    else if (weather = 'thunderstorm') {
      let select_others = true; 
      resultArray2 = await this.alcoholRepository
                .createQueryBuilder('query2')
                .andWhere("query2.id NOT IN (:...ids)", { ids: resultId })
                .andWhere("query2.refreshing = :select_refreshing", {select_refreshing})
                .andWhere("query2.sour = :select_sour", {select_sour})
                .orderBy("RANDOM()")
                .getMany();
    }

    if (resultArray1.length == 2) {
      return [resultArray1[0], resultArray1[1], resultArray2[0], resultId]
    }

    else if (resultArray1.length == 1) {
      return [resultArray1[0], resultArray2[0], resultArray2[1], resultId]
    }

    else if (resultArray1.length == 0) {
      return [resultArray2[0], resultArray2[1], resultArray2[2], resultId]
    }

  }
  }
}
