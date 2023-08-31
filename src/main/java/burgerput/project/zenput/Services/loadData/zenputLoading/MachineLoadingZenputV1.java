package burgerput.project.zenput.Services.loadData.zenputLoading;

import burgerput.project.zenput.domain.Machine;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.*;

import static burgerput.project.zenput.Const.DRIVERLOCATION;
import static burgerput.project.zenput.Const.MACHINEURL;

@Slf4j
//Service
public class MachineLoadingZenputV1 implements MachineLoadingZenput {
    @Override
    public Map<Integer, Machine> getInfo() {

        Map<Integer, Machine> result = new LinkedHashMap<>();

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
            driver.get(MACHINEURL);

            //select elements
            // ul> li > div.field_title + div> div> input
            //field_title 이랑 input의 field_id 필요
            //li class form-field 에서 text랑 input 필드 id값 가져오기

            //li class group
            List<WebElement> fields = driver.findElements(By.className("form-field"));


            if (fields.size() == 0) {
                Machine machine= new Machine();
                machine.setId(-1);
                machine.setName("no");
                machine.setMin(0);
                machine.setMax(0);
                result.put(machine.getId(), machine);
            } else {

                for (WebElement field : fields) {
                    Machine contents = extractIdTitle(field);
                    if (contents.getName() == null) {
                        //if map is empty then not save the data
                    } else {
                        result.put(contents.getId(), contents);
                    }
                }
            }
            //End process
            driver.close();
            driver.quit();

        } catch (Exception e) {
            log.info(e.toString());
        }
        return result;
    }

    @Override
    public Machine extractIdTitle(WebElement field) {
        Machine machine = new Machine();
        try {
            WebElement input = field.findElement(By.tagName("input"));
            WebElement fieldTitle = field.findElement(By.className("field_title"));

            String id = input.getAttribute("field_id");

            if (Integer.parseInt(id) == 0) {
                return new Machine();
            }else{
                //if getText not works use this "innerText"
                String title = fieldTitle.getAttribute("innerText");

                if (title.contains("F")) {
                    machine = extractTitle(title);
                    machine.setId(Integer.parseInt(id));
                }
            }

        } catch (Exception e) {
            log.info("Error LoadMachine={}", e.toString());
        }
        return machine;
    }

    private Machine extractTitle(String title) {

        //setName and Temperture
        Machine machine = new Machine();


        if (!title.equals("")) {
            String[] cutEx = title.split(":");
            // NAME
            String name = cutEx[0].replaceAll(" ", "");
            machine.setName(name);

            //TEMPERTURE
            String[] temps = cutEx[1].split("~");

            if (temps.length == 1) {
                String minS = temps[0].replaceAll("[a-zA-Z가-힣* ]", "");
                machine.setMin(Integer.parseInt(minS));
                //max value

                //핸드싱크, 3조 싱크칸 max온도는 135로 지정
                switch (name) {
                    case "3조싱크칸(세척온수)":
                        machine.setMax(135);
                        break;

                    case "핸드싱크(온수)":
                        machine.setMax(135);
                        break;

                    default:
                        machine.setMax(185);
                        break;
                }
//                log.info("name ={}", machine);


            } else if (temps.length == 2) {
                int i=0;
                for (String temp : temps) {
                    //정규표현식 - 영문 한글 * 을모두 ""로 변경한다.
                    temp = temp.replaceAll("[a-zA-Z가-힣* ]", "");
                    if (i == 0) {
                        machine.setMin(Integer.parseInt(temp));
                    }else if (i==1){
                        machine.setMax(Integer.parseInt(temp));
                    }
                    i++;
                }
            }
        } else {
            ///nothing
            //if title="" then nothing
        }
        return machine;
    }

}
