package burgerput.project.zenput.web.altPages;

import burgerput.project.zenput.Services.loadData.alertCheck.AlertLoading;
import burgerput.project.zenput.Services.loadData.zenputLoading.FoodLoadingZenput;
import burgerput.project.zenput.Services.loadData.zenputLoading.MachineLoadingZenput;
import burgerput.project.zenput.Services.saveData.SaveData;
import burgerput.project.zenput.domain.Food;
import burgerput.project.zenput.domain.Machine;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Map;

import static burgerput.project.zenput.Const.BURGERPUTSITE;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/loading")
public class LoadingController {
    private final SaveData saveData;
    private final AlertLoading alertLoading;
    private final MachineLoadingZenput machineLoadingZenput;
    private final FoodLoadingZenput foodLoadingZenput;

    //ZenputPage loading 후에 달라진 값들을 Alert로 넘긴다.
    @GetMapping
    public void loading(HttpServletRequest request, HttpServletResponse response) throws IOException {

        //Start Loading Logic
        //loading zenput Page's Data first
        Map<Integer, Machine> machineInfo = machineLoadingZenput.getInfo();
        Map<Integer, Food> foodInfo = foodLoadingZenput.getInfo();

        log.info("request URL ={}", request.getRequestURL());
        log.info("loading Controller={}", LocalTime.now().toString());

        saveData.machinezenputdatasave(machineInfo);
        saveData.foodZenputDataSave(foodInfo);

        response.sendRedirect(BURGERPUTSITE);
    }

    @GetMapping("/test")
    @ResponseBody
    public void loadingTest() {
        Map<Integer, Machine> machineInfo = machineLoadingZenput.getInfo();
//        Map<Integer, Food> foodInfo = foodLoadingZenput.getInfo();

////        addMachine Logic=================================================
        ArrayList<Map> addMap = alertLoading.addMachine(machineInfo);

        //del Machine logic
        ArrayList<Map> delMap = alertLoading.delMachine(machineInfo);

        //editMachine logic=====================================
        ArrayList<Map> editMap = alertLoading.editMachine(machineInfo);


        //machine data를 로딩한 것으로 변경함
//        saveData.machinezenputdatasave(machineInfo);

        ArrayList<Map> maps = alertInfo(addMap, delMap, editMap);

        log.info("machine alert info list ={}", maps);

    }

    private ArrayList<Map> alertInfo(ArrayList<Map> addMap, ArrayList<Map> delMap, ArrayList<Map> editMap) {

        //addMap logic
        ArrayList<Map> result = new ArrayList<>();
        if (!addMap.isEmpty() && !addMap.get(0).get("code").equals("all")) {

            for (Map map : addMap) {
                result.add(map);
            }
        }

        //edtiMap Logic
        if (!editMap.isEmpty()) {
            for (Map map : editMap) {
                result.add(map);
            }
        }

        //delMap logic
        if (!delMap.isEmpty()) {
            for (Map map : delMap) {
                result.add(map);
            }
        }

        return result;
    }

    private class AlertCookie {

    }

}
