package burgerput.project.zenput.Services.movePage;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public interface MovePageService {
    public WebDriver gotoList();

    public WebDriver gotoListWithLogin();

    public void clickAmFood();

    public void clickPmFood();

    public void clikcAmMachine();

    public void clickPmMachine();

}
