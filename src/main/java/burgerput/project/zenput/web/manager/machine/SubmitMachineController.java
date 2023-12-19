package burgerput.project.zenput.web.manager.machine;

import burgerput.project.zenput.repository.driverRepository.MachineDriverRepository;
import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.Duration;

import static burgerput.project.zenput.Const.FOODURL;

@Controller
@RequiredArgsConstructor
@Slf4j
public class SubmitMachineController {
    MachineDriverRepository machineDriverRepository;

    @GetMapping("back/submit")
    public String submitMachine() {
        WebDriver driver = machineDriverRepository.getDriver();
        WebElement mgrName = driver.findElement(By.xpath("//*[@id=\"field_18\"]/div[2]/textarea"));

        mgrName.sendKeys("성공했다");

        //GO TO PAGE
        return "result";
    }
}
