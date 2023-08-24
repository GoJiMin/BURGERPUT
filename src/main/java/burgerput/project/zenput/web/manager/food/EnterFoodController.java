package burgerput.project.zenput.web.manager.food;

import burgerput.project.zenput.Services.printData.PrintData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class EnterFoodController {

    private final PrintData printData;

    //show customMachine Data
    @GetMapping("/back/enter/machines")
    public ArrayList<Map> showCustomDbContents() {
        ArrayList<Map> result = printData.customMachine();

        return result;
    }
}
