package burgerput.project.zenput.Services.movePage;

import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Service;


import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import static burgerput.project.zenput.Const.*;

@Slf4j
public class MovePageServiceV1 implements MovePageService{
    Set<Cookie> cookies;

    public WebDriver gotoList() {
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
            driver.get(zenputPageStart);

            WebElement oiwBtn = driver.findElement(By.id("oiw_btn"));
            oiwBtn.click();

            log.info("CLICKED!");

        } catch (Exception e) {
            log.info("error log ={}", e.toString());
        }
        return null;

    }
    //페이지 로그인 까지 하는 것
    @Override
    public WebDriver gotoListWithLogin() {
        System.setProperty("java.awt.headless", "false");
        try {
            System.setProperty("webdriver.chrome.driver", DRIVERLOCATION);
            //chrome driver use

            //remove being controlled option information bar
            ChromeOptions options = new ChromeOptions();
            options.setExperimentalOption("excludeSwitches", new String[]{"enable-automation"});;
            WebDriver driver = new ChromeDriver(options);

//            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
            //==============================Scrape LOGIC START============================

            //GO TO PAGE
            driver.get(zenputPageStart);

            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(20));
            Thread.sleep(3000);
            //no thanks button click
            WebElement oiwBtn = driver.findElement(By.id("oiw_btn"));
            oiwBtn.click();

            try {
                driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(20));
                Thread.sleep(5000);
                boolean loading =true;
                while (loading) {
                    //input field - email 입력 필드
                    WebElement loginSignupFields = driver.findElement(By.className("login_signup_fields"));
                    WebElement input = loginSignupFields.findElement(By.tagName("input"));
                    //zenput 회사 이메일 필요
                    input.sendKeys("rgm21490@rest.whopper.com");
                    if (input.getAttribute("value").equals("")) {

                    } else{
                        loading = false;
                        Thread.sleep(1500); //1.5초 대기

                        //continue 버튼 클릭
                        WebElement loginContinue = driver.findElement(By.id("login_continue"));
                        loginContinue.click();

                    }
                }
            } catch (ElementNotInteractableException e) {
                log.info("error = {}", e);
            }

            log.info("clicked time ={}", LocalDateTime.now());
            //rbi 계정 필요
            //rbi username
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(20));
            Thread.sleep(5000);

            WebElement oktaLogin = driver.findElement(By.id("okta-signin-username"));
            oktaLogin.sendKeys("다이강000001");
            Thread.sleep(500); //0.5초 대기
            //rbi password
            WebElement oktaPassword = driver.findElement(By.id("okta-signin-password"));
            oktaPassword.sendKeys("Axjalsjf123456");

            //sign-in button
            WebElement oktaButton = driver.findElement(By.id("okta-signin-submit"));
            oktaButton.click();
            //https://asdf:Axjalsjf123456@rbi.kerberos.okta.com/
            //http://%EB%8B%A4%EC%9D%B4%EA%B0%95000001:Axjalsjf123456%40rbi.kerberos.okta.com/login/sso_iwa
            cookies = driver.manage().getCookies(); //로그인 세션 정보
            return driver;


        } catch (StaleElementReferenceException e) {
            log.info("noSuchEletmet = {}", e);

        } catch (InterruptedException e) {
            log.info("Thread.sleep error [{}]", e);
        }
        return null;
    }

    @Override
    public void clickAmFood() {
       // BK - 오전 AM 체크리스트를 작성합니다- (제품) - Product Quality Check (AM) - KO_APAC
        String pmFood="BK - 오전 AM 체크리스트를 작성합니다- (제품) - Product Quality Check (AM) - KO_APAC";
        getListClick(pmFood);
    }

    @Override
    public void clickPmFood() {
//오후 PM 체크리스트를 작성합니다- (제품) - Product Quality Check (PM) - KO_APAC,
        String pmFood="BK - 오후 PM 체크리스트를 작성합니다- (제품) - Product Quality Check (PM) - KO_APAC";
        getListClick(pmFood);
    }

    @Override
    public void clikcAmMachine() {
        //BK - 오전 AM 체크리스트를 작성합니다- (기기장비) - Equipment Quality Check (AM) - KO_APAC

        String pmFood="BK - 오전 AM 체크리스트를 작성합니다- (기기장비) - Equipment Quality Check (AM) - KO_APAC";
        getListClick(pmFood);
    }


    @Override
    public void clickPmMachine() {
        //오후 PM 체크리스트를 작성합니다- (기기장비) - Equipment Quality Check (PM) - KO_APAC
        String pmMachine = "BK - 오후 PM 체크리스트를 작성합니다- (기기장비) - Equipment Quality Check (PM) - KO_APAC";
        getListClick(pmMachine);

    }

    private void getListClick(String listText) {
        WebDriver driver = gotoListWithLogin();
        List<WebElement> listTitles = driver.findElements(By.className("taskitem_title"));

        for (WebElement listTitle : listTitles) {
            String listName = listTitle.getAttribute("innerText");
            log.info(listName);

            if (listText.equals(listName)) {
                listTitle.click();
                //양식으로 이동
                WebElement submitForm = driver.findElement(By.id("submit_form"));
                submitForm.click();
                break;
            }
        }
    }
}
