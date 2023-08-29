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
        log.info("loading Controller={}", LocalTime.now().toString() );

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
        ArrayList<Map> maps = alertLoading.addMachine(machineInfo);
        //if insert all then code is all
        log.info("maps info - added value ={}", maps);
        //모두 다 똑같은 경우 에러남 (아무것도 안들어 있음)
        //save data to DB
        if (maps.size() ==0) {
            log.info("nothing to save[Not added ]");
        } else if (maps.get(0).get("code").equals("all")) {
            log.info("save all data");
            saveData.machinezenputdatasave(machineInfo);
        } else {
            log.info("added to cookie?");
            //save to cookie?
        }


        //del Machine logic
        ArrayList<Map> maps1 = alertLoading.delMachine(machineInfo);
        log.info("del machine result ={}", maps1);

        //editMachine logic=====================================
        ArrayList<Map> mapsedit = alertLoading.editMachine(machineInfo);

        log.info("editmachine Result ={}", mapsedit);

        //machine data를 로딩한 것으로 변경함
        saveData.machinezenputdatasave(machineInfo);

    }

    private class AlertCookie{

    }

}
