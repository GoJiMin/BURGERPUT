package burgerput.project.zenput.Services.loadData.zenputLoading;

import burgerput.project.zenput.domain.Food;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.*;

import static burgerput.project.zenput.Const.*;

@Slf4j
//@Service
public class FoodLoadingZenputV1 implements FoodLoadingZenput {

    @Override
    public Map<Integer, Food> getInfo() {
        Map<Integer, Food> result = new LinkedHashMap<>();

        System.setProperty("java.awt.headless", "false");

        try {
            System.setProperty("webdriver.chrome.driver", DRIVERLOCATION);
            //chrome driver use

            //remove being controlled option information bar
            ChromeOptions options = new ChromeOptions();
            options.setExperimentalOption("excludeSwitches", new String[]{"enable-automation"});
            WebDriver driver = new ChromeDriver(options);


            //==============================Scrape LOGIC START============================

            //GO TO PAGE
            driver.get(FOODURL);

            //select elements
            // ul> li > div.field_title + div> div> input
            //field_title 이랑 input의 field_id 필요
            //li class form-field 에서 text랑 input 필드 id값 가져오기

            //li class group
            List<WebElement> fields = driver.findElements(By.className("form-field"));


            if (fields.size() == 0) {
                Food food= new Food();
                food.setId(-1);
                food.setName("no");
                food.setMin(0);
                food.setMax(0);
                result.put(food.getId(), food);
            } else {

                for (WebElement field : fields) {
                   Food contents = extractIdTitle(field);
                    if (contents.getName() ==null) {
                        //if map is empty then not save the data
                    } else {
                        //log.info("contents =?", contents);
                        result.put(contents.getId(),contents);
                    }

                }
            }
            //End process
            driver.quit();

        } catch (Exception e) {
            log.info(e.toString());
        }
        // log.info("result = {}", result);
        return result;
    }

    @Override
    public Food extractIdTitle(WebElement field) {
        Food food = new Food();

        try {
            WebElement input = field.findElement(By.tagName("input"));
            WebElement fieldTitle = field.findElement(By.className("field_title"));

            String id = input.getAttribute("field_id");
            //if getText not works use this "innerText"
            String title = fieldTitle.getAttribute("innerText");


            if (title.contains("F")) {
                food = extractTitle(title);
                food.setId(Integer.parseInt(id));
            }

        } catch (Exception e) {
            log.info("Error LoadFood={}", e.toString());
        }
        return food;
    }

    private Food extractTitle(String title) {

        Food food = new Food();

        if (!title.equals("")) {
            //title is not null
            if (title.contains("-")) {

                String[] cutEx = title.split("-");

                if (cutEx.length == 3) {
                    // NAME
                    String name = (cutEx[0] + cutEx[1]).replaceAll(" ", "");
                    food.setName(name);

                    //TEMPERTURE
                    String[] temps = cutEx[2].split("~");

                    if (temps.length == 1) {
                        String minS = temps[0].replaceAll("[a-zA-Z가-힣* ]", "");
                        food.setMin(Integer.parseInt(minS));
                        //max value
                        food.setMax(185);

                    } else if (temps.length == 2) {
                        int i=0;
                        for (String temp : temps) {
                            temp = temp.replaceAll("[a-zA-Z가-힣* ]", "");
                            if (i == 0) {
                                food.setMin(Integer.parseInt(temp));
                            } else if (i == 1) {
                                food.setMax(Integer.parseInt(temp));
                            }
                           i++;

                        }
                    }
                }else{
                    // NAME
                    String name = cutEx[0].replaceAll(" ", "");
                    food.setName(name);

                    //TEMPERTURE
                    String[] temps = cutEx[1].split("~");

                    if (temps.length == 1) {
                        String minS = temps[0].replaceAll("[a-zA-Z가-힣* ]", "");
                        food.setMin(Integer.parseInt(minS));
                        //max value
                        food.setMax(185);

                    } else if (temps.length == 2) {
                        int i=0;
                        for (String temp : temps) {
                            temp = temp.replaceAll("[a-zA-Z가-힣* ]", "");
                            if (i == 0) {
                                food.setMin(Integer.parseInt(temp));
                            } else if (i == 1) {
                                food.setMax(Integer.parseInt(temp));
                            }
                            i++;
                        }
                    }
                }

            } else if (title.contains(":")) {
                String[] cutEx = title.split(":");
                // NAME
                String name = cutEx[0].replaceAll(" ", "");
                food.setName(name);

                //TEMPERTURE
                String[] temps = cutEx[1].split("~");

                if (temps.length == 1) {
                    String minS = temps[0].replaceAll("[^0-9]", "");
                    food.setMin(Integer.parseInt(minS));
                    //max value
                    food.setMax(185);

                } else if (temps.length == 2) {
                    int i=0;
                    for (String temp : temps) {
                        temp = temp.replaceAll("[a-zA-Z가-힣* ]", "");
                        if (i == 0) {
                            food.setMin(Integer.parseInt(temp));
                        } else if (i == 1) {
                            food.setMax(Integer.parseInt(temp));
                        }
                        i++;
                    }
                }
            }

        } else {
            ///nothing
            //if title="" then nothing
        }
        return food;
    }

}
