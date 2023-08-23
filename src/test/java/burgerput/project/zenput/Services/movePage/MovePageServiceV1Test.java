package burgerput.project.zenput.Services.movePage;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MovePageServiceV1Test {

    MovePageServiceV1 move = new MovePageServiceV1();

    @Test
    @DisplayName("goto List")
    void gotoList() {
        move.gotoListWithLogin();

    }
    @Test
    @DisplayName("[PM] foodList click")
    void pmFoodlistClick() {
        move.clickPmFood();

    }

    @Test
    @DisplayName("[PM] MachineList click")
    void pmMachinelistClick() {
        move.clickPmMachine();

    }

    @Test
    @DisplayName("[AM] MachineList click")
    void amMachinelistClick() {
        move.clickPmMachine();

    }

}