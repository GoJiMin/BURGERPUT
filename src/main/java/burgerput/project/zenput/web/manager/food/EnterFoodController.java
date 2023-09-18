package burgerput.project.zenput.web.manager.food;

import burgerput.project.zenput.Services.printData.PrintData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@RestController
public class EnterFoodController {

    private final PrintData printData;
    @GetMapping("/back/enter/foods")
    @ResponseBody
    public ArrayList enterMachine() {
        Map<String, ArrayList> tempMap = new LinkedHashMap<>();

        ArrayList<Map> customFood = printData.customFood();

        if (customFood == null) {
            ArrayList noData = new ArrayList();
            noData.add("noData");
            tempMap.put("customFood", noData);
        }else{
            tempMap.put("customFood", customFood);
        }

        ArrayList<Map> mgrMap = printData.mgrList();

        tempMap.put("mgrList", mgrMap);

        ArrayList result = new ArrayList();
        result.add(tempMap);
        return result;
    }
}
